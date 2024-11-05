from random import sample
from flask import Flask, request, jsonify
import pickle
import xgboost as xgb
import pandas as pd
import numpy as np
from flask_cors import CORS, cross_origin
import requests
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, support_credentials=True)

COLUMN_NAMES = [
    'engine_no',
    'op_setting_1',
    'op_setting_2',
    'op_setting_3',
    'sensor_1',
    'sensor_2',
    'sensor_3',
    'sensor_4',
    'sensor_5',
    'sensor_6',
    'sensor_7',
    'sensor_8',
    'sensor_9',
    'sensor_10',
    'sensor_11',
    'sensor_12',
    'sensor_13',
    'sensor_14',
    'sensor_15',
    'sensor_16',
    'sensor_17',
    'sensor_18',
    'sensor_19',
    'sensor_20',
    'sensor_21'
]

def telegram_notifier(message="Maintenance needed"):
    TOKEN = ""
    CHAT_ID = ""
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage?chat_id={CHAT_ID}&text={message}"
    try:
        res2 = requests.post(url)
        logger.info(f"Telegram notification sent. Response: {res2.status_code}")
    except Exception as e:
        logger.error(f"Failed to send Telegram notification: {str(e)}")

# Load model
logger.info("Loading XGBoost model...")
with open("xgb_3.pkl", "rb") as file:
    model = pickle.load(file)
logger.info("Model loaded successfully")

@app.route('/predict', methods=['GET', 'POST'])
def calculate():
    global time
    logger.debug(f"Received prediction request. Current time: {time}")
    
    try:
        time += 1
        data = request.get_json()
        numbers = [float(x) for x in data['s_data']]
        
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
        
        if ans1 < 0.4:
            logger.warning("Low RUL detected - sending maintenance notification")
            telegram_notifier("Quick maintenance needed")
        
        return jsonify({
            'rul': str(final_rul),
            's_data': data['s_data'],
            'time': time
        }), 200
        
    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/getsensor', methods=['POST'])
def get_sensor_data():
    global time
    logger.debug(f"Sensor data requested for time {time}")
    try:
        data = request.get_json()
        numbers = [float(x) for x in data['s_data']]
        return jsonify({
            's_data': numbers,
            'column_names': COLUMN_NAMES
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/performance/<int:engine_id>', methods=['GET'])
def get_engine_performance(engine_id):
    logger.debug(f"Performance data requested for engine {engine_id}")
    
    try:
        # Get data for specific engine using engine_no
        engine_data = sample[sample['engine_no'] == engine_id].copy()
        
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