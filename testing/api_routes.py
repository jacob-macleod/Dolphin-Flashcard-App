"""A collection of API routes to be used in test_api.py
"""

class Routes:
    """A collection of API routes to be used in test_api.py
    """
    # authentication.py
    ROUTE_CREATE_ACCOUNT = {
        "url": "/api/create-account",
        "methods": ["POST"]
    }

    ROUTE_GET_USER = {
        "url": "/api/get-user",
        "methods": ["GET"]
    }

    ROUTE_GET_USER_STATS = {
        "url": "/api/get-user-stats",
        "methods": ["GET"]
    }

    ROUTE_FIREBASE_CONFIG = {
        "url": "/api/firebase-config",
        "methods": ["GET"]
    }

    # card_management.py
    ROUTE_CREATE_FLASHCARD = {
        "url": "/api/create-flashcard",
        "methods": ["POST"]
    }

    ROUTE_GET_FLASHCARD_ITEM = {
        "url": "/api/get-flashcard-item",
        "methods": ["GET"]
    }

    ROUTE_GET_FLASHCARD = {
        "url": "/api/get-flashcard",
        "methods": ["GET"]
    }

    ROUTE_GET_TODAY_CARDS = {
        "url": "/api/get-today-cards",
        "methods": ["GET"]
    }

    # statistics.py
    ROUTE_CALCULATE_CARD_STATS = {
        "url": "/api/calculate-card-stats",
        "methods": ["GET"]
    }

    ROUTE_UPDATE_HEATMAP = {
        "url": "/api/update-heatmap",
        "methods": ["POST"]
    }

    ROUTE_GET_HEATMAP = {
        "url": "/api/get-heatmap",
        "methods": ["GET"]
    }

    ROUTE_CALCULATE_STREAK = {
        "url": "/api/calculate-streak",
        "methods": ["POST"]
    }
