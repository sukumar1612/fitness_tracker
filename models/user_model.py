import random

from flask_login import UserMixin


class User(UserMixin):

    def __init__(self, email):
        self.id = email

    def __repr__(self):
        return "%s" % (self.id)
