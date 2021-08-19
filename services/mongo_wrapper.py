import os

import pymongo
from dotenv import load_dotenv

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
#load_dotenv(os.path.join(BASE_DIR, '.env'))


class MongoDatabase:
    CONNECTION_STRING = f'mongodb+srv://skadmin:skmongoadmin@skcluster0.qp29x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    DATABASE = "fitness_data"
    COLLECTION = "inventory"

    def __init__(self, connection_string=CONNECTION_STRING):
        self.client = pymongo.MongoClient(connection_string)
        if not self.client:
            print("failed to connect------------------", self.client)

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
        self.db[user_email].insert_one(data)
        self.db[user_email].create_index([("location_data.location", pymongo.GEO2D)])

    def find_data_near_me(self, user_email, coordinates):
        return self.db[user_email].find({"location_data.location": {"$near": coordinates, "$maxDistance": 80}})

    @staticmethod
    def print_data(data):
        for records in data:
            print(records)
