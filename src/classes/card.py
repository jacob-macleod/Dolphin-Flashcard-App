""" Handle functions associated with cards such as incrementing review dates """
from datetime import datetime, timedelta
from classes.date import Date

class Card:
    """ Stores data for a single flashcard """
    # The current card being looked at
    current_index = None
    # The max num of cards
    max_index = None
    # Whether the card was right, wrong, or easy
    status = None
    last_review = None
    review_status = None
    streak = None
    date = None

    def __init__(
            self,
            current_index,
            max_index,
            card_status,
            last_review,
            review_status,
            streak
    ) :
        self.current_index = current_index
        self.max_index = max_index
        self.status = card_status
        self.last_review = last_review
        self.review_status = review_status
        self.streak = streak
        self.date = Date()

    def increase_date_by_days(self, input_date, days_to_add):
        """ Increase a date by days_to_add """
        # Convert the input_date string to a datetime object
        date_object = datetime.strptime(input_date, '%d/%m/%Y')

        # Increase the date by the specified number of days
        increased_date = date_object + timedelta(days=days_to_add)

        # Convert the increased date back to the 'dd/mm/yyyy' format as a string
        formatted_increased_date = increased_date.strftime('%d/%m/%Y')

        return formatted_increased_date


    def increment_index(self) :
        """ Increment the flashcard index """
        self.streak = str(int(self.streak) + 1)

        if self.streak == "6" :
            new_index = int(self.current_index) - 4
            self.streak = "0"

            if new_index >= 0:
                self.current_index = str(new_index)
            else:
                self.current_index = "0"
        else:
            # Increment the index being looked at
            new_index = int(self.current_index) + 1

            # If the index is not too big:
            if new_index <= int(self.max_index) :
                self.current_index = str(new_index)

    def reset_card(self) :
        """ Reset the card - if the answers were wrong """
        self.review_status = "0.0"
        self.last_review = self.date.get_current_date()

        if int(self.current_index)-5 > 0:
            self.current_index = str(int(self.current_index) -5)
        else:
            self.current_index = "0"

    def increment_days(self, day) :
        """ Increment the day part of the review status
        For now, progression follows the Fibonacci sequence, because:
            - My instinctive understanding broadly follows this sequence
            - On first inspection, it seems like this sequence would work
            - As some strange fluke, I wouldn't be suprised if it was most optimal way to revise
            - There is no con to doing this
            - If I decide there is a better way, it is easy to implement
        """
        day = int(day)

        number1 = 1
        number2 = 1
        next_fibo = number1 + number2
        while next_fibo <= day:
            number1 = number2
            number2 = next_fibo
            next_fibo = number1 + number2

        day = next_fibo
        self.last_review = self.increase_date_by_days(self.last_review, day)
        return str(day)

    def increment_daily_reviews(self, daily_reviews, day) :
        """ Increment the daily reviews by 2 """
        daily_reviews = int(daily_reviews)
        daily_reviews += 2

        if daily_reviews >= 12:
            daily_reviews = 0
            day = 1

        return daily_reviews, day

    def increment_review_status(self) :
        """ Increment the review status of cards"""
        days = self.review_status.split(".")[0]
        daily_reviews = self.review_status.split(".")[1]

        if days == "0":
            print ("Days == 0")
            daily_reviews, days = self.increment_daily_reviews(daily_reviews, days)
        else:
            # Increment the days
            print ("Incrementing days")
            days = self.increment_days(days)
            daily_reviews = "0"

        self.review_status = str(days) + "." + str(daily_reviews)

    def easy_button(self) :
        """ When the easy button is clicked """
        days = self.review_status.split(".")[0]
        daily_reviews = self.review_status.split(".")[1]

        days = self.increment_days(days)
        daily_reviews = "0"
        self.streak = "0"
        self.review_status = str(days) + "." + str(daily_reviews)
