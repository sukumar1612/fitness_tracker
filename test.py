import os
from random import random
from services.mongo_wrapper import MongoDatabase

if __name__ == "__main__":
    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, 'machine_learning\model_finale.sav')
    print(filename)