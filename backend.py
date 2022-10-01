from flask import Flask
import requests
import math
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/')
def index():
    """
  Unimportant debugging function
  """
    return 'Hello from Flask!!'


# address will be coordinates in the form (41.40338, 2.17403)
@app.route('/carbon-footprint/<string:user_address>')
# Calculate the distance based on two coordinates
def calculate_distance(start, dest):
    """
  Take in start and destination coordinates as tuples of integers and return distance in miles(int)
  input: calculate_distance((40.78382,-73.97536), (40.70390,-73.98690))
  output: '8.12'
  """
    headers = {
        'Authorization':
        'prj_live_sk_50595abfe9e330c9e191c10cc3eb32c1681fc629',
    }
    response = requests.get(
        f'https://api.radar.io/v1/route/distance?origin={start[0]}, {start[1]}&destination={dest[0]},{dest[1]}&modes=foot,car&units=imperial',
        headers=headers)
    distance = round(
        response.json()['routes']['car']['distance']['value'] / 5280, 2)

    return distance


# Calculate the distance to the nearest fullfillment center
def nearest_centerdistance(user_location):
    """
  Takes in user_location as coordinates and return distance from the nearest fulfillment center in miles(int)
  """
    fulfillment_centers = {
        "BOS7": (41.76108, -71.09879),
        "BOS5": (42.14859, -71.06037),
        "DBO2": (42.23354, -71.13982)
    }
    lst = []
    bos7_distance = calculate_distance(user_location,
                                       fulfillment_centers['BOS7'])
    bos5_distance = calculate_distance(user_location,
                                       fulfillment_centers['BOS5'])
    cb02_distance = calculate_distance(user_location,
                                       fulfillment_centers['DBO2'])
    lst.append(bos7_distance)
    lst.append(bos5_distance)
    lst.append(cb02_distance)
    nearest_center_distance = min(lst)

    return nearest_center_distance


def calculate_carbon_footprint(address):
    """
  This is the resource the frontend will have access to.
  """

    shipping_dist = nearest_centerdistance(address)

    headers = {
        'Authorization': 'Bearer R012NVSEG7MGQVQXX9BFPVJ19SWN',
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    data = '{"emission_factor": {"activity_id": "commercial_vehicle-vehicle_type_hgv-fuel_source_diesel-engine_size_na-vehicle_age_post_2015-vehicle_weight_gt_10t_lt_12t"},"parameters": {"distance":' + str(
        shipping_dist) + ',"distance_unit": "mi"}}'

    response = requests.post('https://beta3.api.climatiq.io/estimate',
                             headers=headers,
                             data=data)

    return round(response.json()["co2e"], 2)

app.run(host='0.0.0.0', port=81)
