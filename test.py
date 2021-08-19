from random import random
from services.mongo_wrapper import MongoDatabase

if __name__ == "__main__":
    x = MongoDatabase()
    size = int(random() * 10)
    loc = []
    for i in range(0, size):
        loc.append([random() * 180 - 90, random() * 360 - 180])

    loc1 = {"location": loc}

    data1 = {"location_data": loc1,
             "total_time": 200,
             "walking": 150,
             "running": 50}
    print("---*----")
    # x.insert_all_data(user_email="abc@123", data=data1)
    MongoDatabase.print_data(x.get_data("abc@123"))
    print("---*----")
    MongoDatabase.print_data(x.find_data_near_me(user_email="abc@123", coordinates=[-90, -180]))
