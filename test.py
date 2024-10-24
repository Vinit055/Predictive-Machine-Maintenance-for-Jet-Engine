from flask import Flask, request, jsonify
import pickle
import xgboost as xgb
import pandas as pd
import numpy as np
from flask_cors import CORS
import logging
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import mean_squared_error, r2_score

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, support_credentials=True)

# Define the expected column order
EXPECTED_COLUMNS = ['engine_no', 'op_setting_1', 'op_setting_2', 'op_setting_3', 
                   'sensor_1', 'sensor_2', 'sensor_3', 'sensor_4', 'sensor_5', 
                   'sensor_6', 'sensor_7', 'sensor_8', 'sensor_9', 'sensor_10', 
                   'sensor_11', 'sensor_12', 'sensor_13', 'sensor_14', 'sensor_15', 
                   'sensor_16', 'sensor_17', 'sensor_18', 'sensor_19', 'sensor_20', 
                   'sensor_21']

def create_analysis_plots():
    """Create and save analysis plots for verification"""
    try:
        logger.info("Creating analysis plots...")
        feature_cols = ans[time]
        
        # Create DataFrame with the correct column order
        feature_df = pd.DataFrame([feature_cols], columns=EXPECTED_COLUMNS)
        
        # Ensure columns are in the correct order
        feature_df = feature_df[EXPECTED_COLUMNS]
        
        # Make predictions
        predictions = model.predict(feature_df)
        
        # Create correlation heatmap
        sensor_cols = [col for col in samples.columns if 'sensor_' in col]
        correlation_matrix = samples[sensor_cols].corr()
        plt.figure(figsize=(12, 8))
        sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
        plt.title('Sensor Correlation Heatmap')
        plt.savefig('static/correlation_heatmap.png')
        plt.close()
        
        # Create box plots
        plt.figure(figsize=(15, 6))
        samples[sensor_cols].boxplot()
        plt.xticks(rotation=45)
        plt.title('Sensor Data Distribution')
        plt.savefig('static/boxplot.png')
        plt.close()
        
        logger.info("Analysis plots created successfully")
        return True
    except Exception as e:
        logger.error(f"Error creating analysis plots: {str(e)}")
        return False

@app.route('/predict', methods=['GET', 'POST'])
def calculate():
    global time, ans
    try:
        time += 1
        numbers = ans[time]
        
        # Create DataFrame with the correct column order
        numbers_df = pd.DataFrame([numbers], columns=EXPECTED_COLUMNS)
        
        # Ensure columns are in the correct order
        numbers_df = numbers_df[EXPECTED_COLUMNS]
        
        pred = model.predict(numbers_df)
        ans1 = pred[0]
        
        if ans1 < 0:
            ans1 = 0
        if ans1 < 0.4:
            telegram_notifier("Quick maintenance needed")
        
        return jsonify({
            'rul': str(round(ans1 * 144, 0)),
            's_data': numbers,
            'time': time
        }), 200
    except Exception as e:
        logger.error(f"Error in predict endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/get_analysis_data', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_analysis_data():
    try:
        logger.info("Processing analysis data request...")
        
        # Create verification plots
        create_analysis_plots()
        
        # Ensure features are in correct order
        X = samples[EXPECTED_COLUMNS]
        
        # Make predictions
        predictions = model.predict(X)
        actual = samples['RUL'].values if 'RUL' in samples.columns else np.zeros_like(predictions)
        
        # Prepare response data
        actual_vs_predicted = [
            {"actual": float(actual[i]), "predicted": float(predictions[i])} 
            for i in range(len(predictions))
        ]
        
        sensor_cols = [col for col in samples.columns if 'sensor_' in col]
        correlation_matrix = samples[sensor_cols].corr().values.tolist()
        
        box_plot_data = [{
            "name": column,
            "min": float(samples[column].min()),
            "q1": float(samples[column].quantile(0.25)),
            "median": float(samples[column].median()),
            "q3": float(samples[column].quantile(0.75)),
            "max": float(samples[column].max())
        } for column in sensor_cols]
        
        mse = mean_squared_error(actual, predictions)
        r2 = r2_score(actual, predictions)
        
        response_data = {
            'actualVsPredicted': actual_vs_predicted,
            'correlationData': correlation_matrix,
            'boxPlotData': box_plot_data,
            'statistics': {
                'mse': float(mse),
                'r2': float(r2)
            }
        }
        
        logger.info("Analysis data processed successfully")
        return jsonify(response_data), 200
        
    except Exception as e:
        logger.error(f"Error in get_analysis_data: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    time = 0
    # Load data and model
    try:
        logger.info("Loading data and model...")
        samples = pd.read_csv("./merged.csv")
        with open("xgb.pkl", "rb") as file:
            model = pickle.load(file)
        logger.info("Data and model loaded successfully")
    except Exception as e:
        logger.error(f"Error loading data or model: {str(e)}")
        raise
        
    create_analysis_plots()
    app.run(debug=True)