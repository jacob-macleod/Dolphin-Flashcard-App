""" Provides a class to interact with the database """
from backend.database.database_abstract import DatabaseAbstract

class LocalDatabase(DatabaseAbstract):
    """ Write to local files for development """

    def get(self, path):
        """ Get data from database """
        print ("Getting data from " + path)

    def save(self, path, data) :
        """ Save data to a path """
        print ("Saving " + data + " to " + path)

    def increment(self, path, increment_amount) :
        """ Increment a number stored as a string from a path in the database """
        print ("Incrementing " + path + " by " + str(increment_amount))
