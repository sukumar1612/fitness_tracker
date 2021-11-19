import os

import pymongo
from dotenv import load_dotenv

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(BASE_DIR, '.env'))


class MongoDatabase:
    CONNECTION_STRING = f'mongodb+srv://skadmin:{os.environ.get("password")}@skcluster0.qp29x.mongodb.net' \
                        f'/myFirstDatabase?retryWrites=true&w=majority'
    DATABASE = "fitness_data"
    COLLECTION = "inventory"

    def __init__(self, connection_string=CONNECTION_STRING):
        self.client = pymongo.MongoClient(connection_string)
        self.db = self.client[self.DATABASE]

    def authenticate(self, user_email, password):
        collection = "users"
        data = self.db[collection].find({"useremail": user_email, "password": password})
        for i in data:
            if i["useremail"] == user_email and i["password"] == password:
                return True
        return False

    def create_users(self, user_email, password):
        collection = "users"
        if self.authenticate(user_email, password):
            return "user already exists"
        self.db[collection].insert_one({"useremail": user_email, "password": password})

    def get_data(self, user_email=COLLECTION):
        return self.db[user_email].find()

    def insert_all_data(self, user_email, data):
        self.db[user_email].insert_one(data.copy())
        self.db[user_email].create_index([("location_data", pymongo.GEO2D)])

    def find_data_near_me(self, user_email, coordinates, lat, longi):
        return self.db[user_email].aggregate([
            {"$geoNear": {
                "near": {
                    "type": "Point",
                    "coordinates": [lat, longi]
                },
                "maxDistance": 0.01,
                "spherical": True,
                "distanceField": "distance"
            }}
        ])

    @staticmethod
    def print_data(data):
        for records in data:
            print(records)


if __name__ == "__main__":
    database = MongoDatabase()
    print(database.authenticate(user_email="suku1612@gmail.com", password="admin123"))
