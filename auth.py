from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
import os
import logging

# Set up Blueprint for auth routes
auth_bp = Blueprint('auth', __name__)

# Connect to MongoDB using the URI from the environment
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client['capstone_db']  # Use the name of your database
users_collection = db['users']

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

# Protected route to test JWT access
@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(message="Access granted"), 200
