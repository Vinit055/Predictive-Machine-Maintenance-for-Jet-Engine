import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
import os
import logging
from bson.objectid import ObjectId

# Set up Blueprint for auth routes
auth_bp = Blueprint('auth', __name__)

# Connect to MongoDB using the URI from the environment
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client['capstone_db']  # Use the name of your database
users_collection = db['users']
reminders_collection = db['reminders']

# Configure logging
logger = logging.getLogger(__name__)

# Signup route
@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    if users_collection.find_one({"username": username}):
        logger.warning(f"Signup failed: User '{username}' already exists.")
        return jsonify({"message": "User already exists"}), 400

    hashed_password = generate_password_hash(password)
    users_collection.insert_one({"username": username, "password": hashed_password})
    logger.info(f"User '{username}' signed up successfully.")
    return jsonify({"message": "Signup successful"}), 201

# Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = users_collection.find_one({"username": username})
    if not user or not check_password_hash(user["password"], password):
        logger.warning(f"Login failed: Invalid credentials for '{username}'.")
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=username)
    logger.info(f"User '{username}' logged in successfully.")
    return jsonify(access_token=access_token), 200

@auth_bp.route('/logout', methods=['POST'])
def logout():
    logger.info("User logged out successfully.")
    return jsonify({
        "message": "Logout successful",
        "deleteLocalStorage": True
    }), 200

@auth_bp.route('/api/reminders', methods=['POST'])
@jwt_required()
def save_reminder():
    user_id = get_jwt_identity()
    data = request.get_json()
    reminder = {
        'user_id': user_id,
        'date': datetime.datetime.fromisoformat(data['date']),
        'text': data['text'],
    }
    inserted_reminder = reminders_collection.insert_one(reminder)
    return jsonify({
        '_id': str(inserted_reminder.inserted_id),
        'date': data['date'],
        'text': data['text'],
    })

@auth_bp.route('/api/reminders', methods=['GET'])
@jwt_required()
def get_reminders():
    user_id = get_jwt_identity()
    reminders = list(reminders_collection.find({'user_id': user_id}))
    return jsonify([{
        '_id': str(reminder['_id']),
        'date': reminder['date'].isoformat(),
        'text': reminder['text'],
    } for reminder in reminders])

@auth_bp.route('/api/reminders/<reminder_id>', methods=['DELETE'])
@jwt_required()
def delete_reminder(reminder_id):
    user_id = get_jwt_identity()
    result = reminders_collection.delete_one({'_id': ObjectId(reminder_id), 'user_id': user_id})
    if result.deleted_count == 1:
        return jsonify({'message': 'Reminder deleted successfully'})
    else:
        return jsonify({'message': 'Reminder not found or not owned by the user'}), 404

# Protected route to test JWT access
@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(message="Access granted"), 200