"""A collection of API routes to be used"""

class Routes:
    """A collection of API routes to be used
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
        "methods": ["POST"]
    }

    ROUTE_CALCULATE_STREAK = {
        "url": "/api/calculate-streak",
        "methods": ["POST"]
    }

    ROUTE_MOVE_FLASHCARD = {
        "url": "/api/move-flashcard-set",
        "methods": ["POST"]
    }

    ROUTE_CREATE_CARD_GOAL = {
        "url": "/api/create-card-goal",
        "methods": ["POST"]
    }

    ROUTE_CREATE_XP_GOAL = {
        "url": "/api/create-xp-goal",
        "methods": ["POST"]
    }

    ROUTE_UPDATE_GOAL_STATUS = {
        "url": "/api/update-goal-status",
        "methods": ["POST"]
    }

    ROUTE_EDIT_CARD_GOAL = {
        "url": "/api/edit-card-goal",
        "methods": ["POST"]
    }

    ROUTE_EDIT_XP_GOAL = {
        "url": "/api/edit-xp-goal",
        "methods": ["POST"]
    }

    ROUTE_DELETE_GOAL = {
        "url": "/api/delete-goal",
        "methods": ["DELETE"]
    }

    ROUTE_CREATE_FOLDER = {
        "url": "/api/create-folder",
        "methods": ["POST"]
    }
