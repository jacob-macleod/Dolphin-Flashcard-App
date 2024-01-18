""" Routes relating to statistics """
import threading
from flask import Blueprint, request, jsonify
from database.database import database as db
from classes.date import Date
from classes.card import Card
from verification.api_error_checking import check_request_json
from routes.api.regex_patterns import REVIEW_STATUS_REGEX, DATE_REGEX, NUMBER, CARD_STATUS

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
    })

@statistics_routes.route("/api/update-heatmap", methods=["POST"])
def update_heatmap() :
    """ Called when streak is updated
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
            {"error": result + ". The request should be in the format: " + str(expected_format)}
        ), 400

    user_id = request.json.get("userID")
    heatmap = db.get("/users/" + user_id + "/heatmapData")
    date = Date()
    today = date.get_current_date().replace('/', '-')

    # Heatmap has a date as the key, and the value is the number of cards reviewed that day
    if heatmap is not None :
        item_found = False
        for item in heatmap:
            if item == today:
                item_found = True
                # Increment data
                heatmap[item] = str(int(heatmap[item]) + 1)

        # If no data for today is recorded
        if not item_found:
            heatmap[today] = "1"
    # If the heatmap has not been created yet
    else :
        heatmap = {}
        heatmap[(today)] = "1"
    db.save("/users/" + user_id + "/heatmapData", heatmap)
    return jsonify(heatmap)

@statistics_routes.route("/api/get-heatmap", methods=["POST"])
def get_heatmap() :
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
            {"error": result + ". The request should be in the format: " + str(expected_format)}
        ), 400

    user_id = request.json.get("userID")
    heatmap = db.get("/users/" + user_id + "/heatmapData")
    return jsonify(heatmap)

@statistics_routes.route("/api/calculate-streak", methods=["POST"])
def calculate_streak() :
    """ Calculate the user's streak, and increase it if needed
        json should be included with the request as the following:
        {
            "userID": "my id"
        }
        ?increase=true can be added to the streak to increase it if needed
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
            {"error": result + ". The request should be in the format: " + str(expected_format)}
        ), 400

    user_id = request.json.get("userID")
    date = Date()
    stats = db.get("/users/" + user_id + "/statistics/")
    last_streak = stats["lastStreak"]
    today = date.get_current_date()
    difference = date.compare_dates(last_streak, today)

    # If the streak needs to be reset
    if difference < -1:
        db.save("/users/" + user_id + "/statistics/streak", "0")
        db.save("/users/" + user_id + "/statistics/lastStreak", today)
    if difference == -1 and request.args.get("increase") == "true":
        db.increment("/users/" + user_id + "/statistics/streak", 1)
        db.save("/users/" + user_id + "/statistics/lastStreak", today)

    return jsonify({"success": True}, 200)
