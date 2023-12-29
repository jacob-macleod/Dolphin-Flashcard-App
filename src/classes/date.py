""" Contains functions to manage dates"""
from datetime import datetime

class Date:
    """ Functions to manage date """
    def get_current_date(self):
        """ Get the current date """
        current_date = datetime.now()

        # Format the date as dd/mm/yyyy
        formatted_date = current_date.strftime('%d/%m/%Y')

        return formatted_date

    def compare_dates(self, date1, date2) :
        """ Compares two dates and returns date1 - date2 in days """
        format_str = "%d/%m/%Y"
        datetime_date1 = datetime.strptime(date1, format_str)
        datetime_date2 = datetime.strptime(date2, format_str)

        # Calculate the difference between the dates
        difference = datetime_date1 - datetime_date2

        # Return the difference in days
        return difference.days
