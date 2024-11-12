from flask import Flask, request, jsonify
import pickle
import os
import xgboost as xgb
import pandas as pd
import numpy as np
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager
import requests
import logging
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Enhanced CORS configuration
CORS(app, 
     support_credentials=True,
     resources={
         r"/*": {
             "origins": ["http://127.0.0.1:5000"],  # Replace with specific origins in production
             "methods": ["GET", "POST", "OPTIONS"],
             "allow_headers": ["Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
             "expose_headers": ["Content-Range", "X-Content-Range"]
         }
     })

# Setup JWT for authentication
jwt = JWTManager(app)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
# Register Auth Blueprint
from auth import auth_bp
app.register_blueprint(auth_bp)

# Define column names - using engine_no to match the model's expectations
COLUMN_NAMES = [
    'engine_no',  # Changed from engine_id to engine_no to match model expectations
    'op_setting_1',
    'op_setting_2',
    'op_setting_3'
] + [f'sensor_{i}' for i in range(1, 22)]

# Load and preprocess data
logger.info("Loading data...")
samples = pd.read_csv("./merged.csv", header=None, names=COLUMN_NAMES)
logger.info(f"Loaded data shape: {samples.shape}")
logger.info(f"Columns: {samples.columns}")

def telegram_notifier(message="Maintenance needed"):
    TOKEN = os.getenv('BOT_TOKEN_ID')
    CHAT_ID = os.getenv('BOT_CHAT_ID')
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage?chat_id={CHAT_ID}&text={message}"
    try:
        res2 = requests.post(url)
        logger.info(f"Telegram notification sent. Response: {res2.status_code}")
    except Exception as e:
        logger.error(f"Failed to send Telegram notification: {str(e)}")

# Preprocess data
logger.info("Preprocessing data...")
ans = []
for i in range(len(samples)):
    ans.append(samples.iloc[i].tolist())
logger.info(f"Processed {len(ans)} samples")

# Load model
logger.info("Loading XGBoost model...")
with open("xgb.pkl", "rb") as file:
    model = pickle.load(file)
logger.info("Model loaded successfully")

@app.route('/predict', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def calculate():
    if request.method == 'OPTIONS':
        return '', 204
        
    global time, ans
    logger.debug(f"Received prediction request. Current time: {time}")
    
    if not request.is_json:
        try:
            time += 1
            numbers = ans[time]
            numbers2 = ans[time]
            
            logger.debug(f"Processing sample {time}")
            logger.debug(f"Input features: {numbers}")
            
            # Create DataFrame with proper column names
            numbers_df = pd.DataFrame([numbers], columns=COLUMN_NAMES)
            
            # Keep engine_no in the feature set since model expects it
            pred = model.predict(numbers_df)
            logger.info(f"Raw prediction: {pred[0]}")
            
            ans1 = max(pred[0], 0)  # Ensure non-negative
            final_rul = round(ans1 * 144, 0)
            
            logger.info(f"Final RUL prediction: {final_rul}")
            
            if ans1 < 0.2:
                logger.warning("Low RUL detected - sending maintenance notification")
                telegram_notifier("Quick maintenance needed")
            
            return jsonify({
                'rul': str(final_rul),
                's_data': numbers2,
                'time': time
            }), 200
            
        except Exception as e:
            logger.error(f"Error during prediction: {str(e)}")
            return jsonify({'error': str(e)}), 500
    else:
        logger.error("Invalid request format - JSON data not expected")
        return jsonify({'error': 'Request data must be in JSON format.'}), 400

@app.route('/getsensor', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def get_sensor_data():
    if request.method == 'OPTIONS':
        return '', 204
        
    global time
    logger.debug(f"Sensor data requested for time {time}")
    try:
        current_data = ans[time]
        time += 1
        return jsonify({
            's_data': current_data,
            'column_names': COLUMN_NAMES
        }), 200
    except IndexError:
        return jsonify({'error': 'No more sensor data available'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/performance/<int:engine_id>', methods=['GET', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def get_engine_performance(engine_id):
    if request.method == 'OPTIONS':
        return '', 204
        
    logger.debug(f"Performance data requested for engine {engine_id}")
    
    try:
        # Get data for specific engine using engine_no
        engine_data = samples[samples['engine_no'] == engine_id].copy()
        
        if engine_data.empty:
            logger.warning(f"No data found for engine {engine_id}")
            return jsonify({'error': 'Engine ID not found'}), 404

        # Make predictions - use all columns since model expects engine_no
        predictions = model.predict(engine_data)
        engine_data['predicted_RUL'] = predictions * 144  # Convert to same scale as actual RUL

        # Calculate statistics
        sensor_columns = [col for col in COLUMN_NAMES if col.startswith('sensor_')]
        stats = {
            'sensor_stats': {
                sensor: {
                    'mean': float(engine_data[sensor].mean()),
                    'std': float(engine_data[sensor].std()),
                    'min': float(engine_data[sensor].min()),
                    'max': float(engine_data[sensor].max()),
                    'median': float(engine_data[sensor].median())
                }
                for sensor in sensor_columns
            },
            'operational_settings': {
                setting: {
                    'mean': float(engine_data[setting].mean()),
                    'std': float(engine_data[setting].std()),
                    'min': float(engine_data[setting].min()),
                    'max': float(engine_data[setting].max())
                }
                for setting in ['op_setting_1', 'op_setting_2', 'op_setting_3']
            },
            'predictions': {
                'mean_predicted_RUL': float(engine_data['predicted_RUL'].mean()),
                'min_predicted_RUL': float(engine_data['predicted_RUL'].min()),
                'max_predicted_RUL': float(engine_data['predicted_RUL'].max()),
                'current_RUL': float(engine_data['predicted_RUL'].iloc[-1])
            }
        }

        # Convert to records format and handle NaN values
        performance_data = engine_data.replace({np.nan: None}).to_dict(orient='records')
        
        logger.info(f"Successfully processed data for engine {engine_id}")
        logger.debug(f"Stats: {stats}")

        return jsonify({
            'performance_data': performance_data,
            'statistics': stats,
            'column_names': COLUMN_NAMES
        }), 200

    except Exception as e:
        logger.error(f"Error processing engine {engine_id}: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    time = 0
    logger.info("Starting Flask application...")
    app.run(debug=True)