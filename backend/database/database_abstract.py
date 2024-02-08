"""Provides the abstract class for the database
"""
from abc import ABC, abstractmethod

class DatabaseAbstract(ABC) :
    """ Abstract class for the database """

    @abstractmethod
    def get(self, path):
        """ Get data from database """

    @abstractmethod
    def save(self, path, data) :
        """ Save data to a path """

    @abstractmethod
    def increment(self, path, increment_amount) :
        """ Increment a number stored as a string from a path in the database """
