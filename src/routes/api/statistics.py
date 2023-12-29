""" Routes relating to statistics """
import threading
from flask import Blueprint, request, jsonify
from database.database import database as db
from classes.card import Card

statistics_routes = Blueprint('statistics_routes', __name__)

def increase_xp(user_id, increment_amount) :
    """ Increase the user's XP by 10 """
    db.increment("/users/" + user_id + "/statistics/totalXP", increment_amount)
    db.increment("/users/" + user_id + "/statistics/weeklyXP", increment_amount)

@statistics_routes.route("/api/calculate-card-stats", methods=["POST"])
def calculate_card_stats() :
    """ Used when a user is revising a set of cards.
        For each card, calculate the next card to look at,
        And the new card review times and review statuses

        Example request:
        {
            "userID": "my-id",
            "cardStatus": "right",
            "cardStreak": "3",
            "currentIndex": "4",
            "lastReview": "09/01/2024",
            "maxIndex": "20",
            "reviewStatus": "8.0"
        }
    """
    user_id = request.json.get("userID")
    # The current card being looked at
    current_index = request.json.get("currentIndex")
    # The max num of cards
    max_index = request.json.get("maxIndex")
    # Whether the card was right, wrong, or easy
    card_status = request.json.get("cardStatus")
    last_review = request.json.get("lastReview")
    review_status = request.json.get("reviewStatus")
    # How many cards have been looked at in the set this session before getting one wrong
    streak = request.json.get("cardStreak")

    card = Card(
        current_index,
        max_index,
        card_status,
        last_review,
        review_status,
        streak
    )

    # If the user got the card right
    if card_status == "right":
        card.increment_index()
        card.increment_review_status()
    elif card.status == "easy" :
        card.increment_index()
        card.easy_button()
    else:
        card.reset_card()

    # When review_status is small, it's close to 10. The bigger it is, the smaller xp_increase is
    xp_increase = round(10 - (1-(int(float(review_status)) / 100)))
    thread = threading.Thread(target=increase_xp, args=(user_id, xp_increase))
    thread.start()

    # Return the updated card details
    return jsonify({
        "currentIndex": card.current_index,
        "maxIndex": card.max_index,
        "cardStatus": card.status,
        "lastReview": card.last_review,
        "reviewStatus": card.review_status,
        "cardStreak": card.streak
    })
