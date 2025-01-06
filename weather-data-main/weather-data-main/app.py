from flask import Flask, request, jsonify
import requests
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

API_KEY = "2194b9f68034d5f773ae21ff9d5f0f8a"  
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

@app.route('/get_weather', methods=['GET'])  # Make sure the method is GET
def get_weather():
    city = request.args.get('city')  # Retrieve city from query params
    
    if not city:
        return jsonify({'error': 'City name is required'}), 400

    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric"
    }

    try:
        response = requests.get(BASE_URL, params=params)
        weather_data = response.json()

        if weather_data.get('cod') != 200:
            return jsonify({'error': weather_data.get('message', 'City not found')}), 404
        
        return jsonify({
            'city': weather_data['name'],
            'temperature': weather_data['main']['temp'],
            'description': weather_data['weather'][0]['description'],
            'humidity': weather_data['main']['humidity'],
            'wind_speed': weather_data['wind']['speed']
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
