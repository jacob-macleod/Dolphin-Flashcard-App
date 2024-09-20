""" Routes relating to statistics """
import threading
import time
from flask import Blueprint, request, jsonify
from database.database import database as db
from classes.date import Date
from classes.card import Card
from verification.api_error_checking import check_request_json
from routes.api.validation_wrapper import validate_json

statistics_routes = Blueprint('statistics_routes', __name__)

UPDATE_HEATMAP_FORMAT = {
    "jwtToken": "",
}

GET_HEATMAP_FORMAT = UPDATE_HEATMAP_FORMAT
CALCULATE_STREAK_FORMAT = {
    "jwtToken": ""
}

def increase_xp(user_id, increment_amount) :
    """ Increase the user's XP by 10 """
    db.increment("/users/" + user_id + "/statistics/totalXP", increment_amount)
    db.increment("/users/" + user_id + "/statistics/weeklyXP", increment_amount)

'''
This is deprecated since version 3.0.0, because I think it'll be too slow calculating this
server side. Instead, the same algorithm will be used client side. This has the disadvantage of
potential inconsistencies between clients in different languages (for example, Flutter and React,
if Flutter is added at some point), but it means that loading the next card will be instant. This
is really important, because:
- If it takes 2 seconds to fetch this data, if the user revises 100-200 cards (achievable when revising
    language vocab), it'll delay the user by 3-6 minutes. This is a lot of time to wait for a user - they are
    overall delayed by 5 mins
- There's more API requests - more expensive
- The user will get bored if they have to wait - its hard enough revising cards anyway without having to wait
    for ages

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
    # Check the request json
    expected_format = {
            "userID": "",
            "cardStatus": CARD_STATUS,
            "cardStreak": NUMBER,
            "currentIndex": NUMBER,
            "lastReview": DATE_REGEX,
            "maxIndex": NUMBER,
            "reviewStatus": REVIEW_STATUS_REGEX
        }
    result = check_request_json(
        expected_format,
        request.json
    )
    if result is not True:
        return jsonify(
            {"error": result + ". The request should be in the format: " + str(expected_format)}
        ), 400

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
    })'''

'''
These routes are deprecated since version 3.0.0. /api/get-user-stats can
get all this data, but more efficiently (this data is requested in the
dashboard page together, so one request can be used instead of 3)


@statistics_routes.route("/api/get-weekly-xp", methods=["POST"])
def get_weekly_xp() :
    """ Get the user's heatmap data
        Requests should have json in the following format:
    {
        "userID": "my id"
    }
    """
    # Check the request json
    expected_format = {
        "userID": "",
    }
    result = check_request_json(
        expected_format,
        request.json
    )
    if result is not True:
        return jsonify(
            {
                "error": result + ". The request should be in the format: " + str(expected_format)}
        ), 400

    user_id = request.json.get("userID")
    weekly_xp = db.get("/users/" + user_id + "/statistics/weeklyXP")
    return jsonify(weekly_xp)

@statistics_routes.route("/api/get-total-xp", methods=["POST"])
def get_total_xp() :
    """ Get the user's heatmap data
        Requests should have json in the following format:
    {
        "userID": "my id"
    }
    """
    # Check the request json
    expected_format = {
        "userID": "",
    }
    result = check_request_json(
        expected_format,
        request.json
    )
    if result is not True:
        return jsonify(
            {
                "error": result + ". The request should be in the format: " + str(expected_format)}
        ), 400

    user_id = request.json.get("userID")
    total_xp = db.get("/users/" + user_id + "/statistics/totalXP")
    return jsonify(total_xp)
'''

@statistics_routes.route("/api/update-heatmap", methods=["POST"])
@validate_json(UPDATE_HEATMAP_FORMAT)
def update_heatmap() :
    """ Called when streak is updated
        Requests should have json in the following format:
    {
        "userID": "my id"
    }
     """
    user_id = request.json.get("userID")
    date = Date()
    today = date.get_current_date().replace('/', '-')

    try:
        heatmap = db.statistics.update_heatmap(user_id, today)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify(heatmap)

@statistics_routes.route("/api/get-heatmap", methods=["POST"])
@validate_json(GET_HEATMAP_FORMAT)
def get_heatmap() :
    """ Get the user's heatmap data
        Requests should have json in the following format:
    {
        "userID": "my id"
    }
    """
    user_id = request.json.get("userID")
    try:
        return db.statistics.get_heatmap(user_id)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@statistics_routes.route("/api/calculate-streak", methods=["POST"])
@validate_json(CALCULATE_STREAK_FORMAT)
def calculate_streak():
    """ Calculate the user's streak, and increase it if needed
        json should be included with the request as the following:
        {
            "userID": "my id",
        }
        ?increase=true can be added to the streak to increase it if needed
     """
    user_id = request.json.get("userID")
    date = Date()

    try:
        new_streak = db.statistics.calculate_streak(user_id, date, request.args.get("increase"))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"streak": new_streak}, 200)
