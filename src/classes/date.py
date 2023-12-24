""" Contains functions to manage dates"""
from datetime import datetime

class Date:
    def get_current_date(self):
        """ Get the current date """
        current_date = datetime.now()

        # Format the date as dd/mm/yyyy
        formatted_date = current_date.strftime('%d/%m/%Y')

        return formatted_date