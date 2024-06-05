""" Includes all tests for the project """
import sys
import os
import unittest

from api_routes import Routes

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, '..', 'backend')
sys.path.append(src_path)
from verification.api_error_checking import check_request_json
from classes.date import Date
from json import loads, dumps
from requests import get, post, delete
from main import server_addr
from database.database_config import type

# Check the database is set to local
if type != "local":
    raise ValueError(
        f"The database type in src/database/database_config.py is set to '{type}', not 'local'!"
    )

headers = {
    'Content-Type': 'application/json'
}

date = Date()

class TestApi(unittest.TestCase):
    """Test the API
    """
    def get_api(self, route: str, data: dict = None) -> dict:
        """
        Simple get method to not repeat "get" everytime
        """

        response = get(
            f'http://127.0.0.1:{server_addr[1]}{route}',
            headers=headers,
            data=dumps(data),
            timeout=5
        )

        self.assertNotEqual(
            response.status_code, 500,
            "An unhandled exception caused an Internal Server Error " +
            f"({response.status_code}) in " +
            f"{route}"
        )

        return loads(response.text)

    def post_api(self, route: str, data: dict) -> dict:
        """
        Simple get method to not repeat "post" everytime
        """

        response = post(
            f'http://127.0.0.1:{server_addr[1]}{route}',
            data=dumps(data),
            headers=headers,
            timeout=5
        )

        self.assertNotEqual(
            response.status_code, 500,
            f"An unhandled exception caused an Internal Server Error ({response.status_code}) in "
            f"{route}"
        )

        return loads(response.text)

    def delete_api(self, route: str, data: dict) -> dict:
        """
        Simple get method to not repeat "delete" everytime
        """

        response = delete(
            f'http://127.0.0.1:{server_addr[1]}{route}',
            data=dumps(data),
            headers=headers,
            timeout=5
        )

        self.assertNotEqual(
            response.status_code, 500,
            f"An unhandled exception caused an Internal Server Error ({response.status_code}) in "
            f"{route}"
        )

        return loads(response.text)

    def test_example(self) -> None:
        """
        Brief description
        """
        data = {
            "key1": "value1",
            "key2": "value2"
        }

        # TODO: Warning / Question tho who is coding the backend

        response = True

        self.assertTrue(response, 'Should be True, but was {}'.format(response))

    def test_check_request_json(self) -> None:
        """Check the check_request_json function works as expected
        """

        # Test with a valid request
        result = check_request_json(
            {
                "key1": "",
                "key2": ""},
            {
                "key1": "",
                "key2": ""}
        )

        self.assertTrue(result)

        # Test with a valid request but keys have different values
        result = check_request_json(
            {
                "key1": "val1",
                "key2": "value2"},
            {
                "key1": "",
                "key2": ""}
        )

        self.assertEqual(result, True)

        # Test with a valid request but keys are in different order
        result = check_request_json(
            {
                "key2": "",
                "key1": ""},
            {
                "key1": "",
                "key2": ""}
        )
        self.assertEqual(result, 'Your supplied json keys do not match the expected format',
                         'Your supplied json keys do not match the expected format')

        # Test with valid keys and some extra ones
        result = check_request_json(
            {
                "key1": "",
                "key2": "",
                "key3": ""},
            {
                "key1": "",
                "key2": ""}
        )
        self.assertEqual(result, 'Your supplied json keys do not match the expected format',
                         'Your supplied json keys do not match the expected format')

        # Test with invalid keys
        result = check_request_json(
            {
                "key3": "",
                "key4": ""},
            {
                "key1": "",
                "key2": ""}
        )

        self.assertEqual(result, 'Your supplied json keys do not match the expected format',
                         'Your supplied json keys do not match the expected format')

        # Test with valid regex pattern
        expected_format = {
            "name" : "",
            "age"  : r'\d+',
            "email": r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
        }

        request_data = {
            "name" : "John Doe",
            "age"  : "30",
            "email": "john@example.com",
        }
        result = check_request_json(expected_format, request_data)
        self.assertTrue(result, msg='Invalid regex pattern')

        expected_format = {
            "name"   : "",
            "age"    : "",
            "email"  : "",
            "address": {
                "street"  : "",
                "city"    : "",
                "postcode": ""
            }
        }

        request_data = {
            "name"   : "",
            "age"    : "",
            "email"  : "",
            "address": {
                "street"  : "",
                "city"    : "",
                "postcode": ""
            }
        }

        result = check_request_json(expected_format, request_data)
        self.assertTrue(result, 'Invalid json format for keys and sub keys.')

    # Authentication
    def test_create_account_valid(self) -> None:
        """
        Valid account
        """
        valid_dummy = {
            "userID": "1",
            "displayName": "Dummy"
        }

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT['url'], valid_dummy)
        response_json = response[0]
        print (response_json)
        self.assertTrue(expr=response_json['success'],
                        msg='Dummy account creation should be successful.')

    def test_get_user(self) -> None:
        """Get the newly created user
        """
        valid_dummy = {
            "userID": "1"
        }

        response = self.get_api(Routes.ROUTE_GET_USER['url'], valid_dummy)
        response_json = response[0]
        assert response_json == {'name': 'Dummy'}

    def test_get_invalid_user(self):
        """Get a user that does not exist
        """
        invalid_dummy = {
            "userID": "2"
        }

        response = self.get_api(Routes.ROUTE_GET_USER['url'], invalid_dummy)
        response_json = response[0]
        assert response_json is None

    def test_get_user_stats(self):
        """Get the statistics for the user that has been created
        """
        # Test case 1: Get the user stats
        valid_dummy = {
            "userID": "1"
        }

        response = self.get_api(Routes.ROUTE_GET_USER_STATS['url'], valid_dummy)
        response_json = response[0]
        assert response_json == {
            'lastStreak': date.get_current_date(),
            'streak': 0,
            'weeklyXP': 0,
            'totalXP': 0,
            'heatmap_data': {
                date.get_current_date().replace("/", "-"): "1"
            }
        }

        # Test case 2: Update the heatmap

    def test_get_invalid_user_stats(self):
        """Get the statistics for a user that does not exist
        """
        invalid_dummy = {
            "userID": "2"
        }

        response = self.get_api(Routes.ROUTE_GET_USER_STATS['url'], invalid_dummy)
        response_json = response[0]
        assert response_json is None

    def test_create_flashcard_set(self):
        """Create a flashcard set for the newly created user
        """
        flashcard_data ={
            "userID": "1",
            "flashcardName": "My new set",
            "flashcardDescription": "This is\nmy description",
            "folder": "parent-name",
            "cards": [
                {
                    "front":"Front 1",
                    "back": "Back 1",
                    "reviewStatus":"0.0",
                    "lastReview": "27/04/2024"
                },
                {
                    "front":"Front 2",
                    "back": "Back 2",
                    "reviewStatus":"0.0",
                    "lastReview": "27/04/2024"
                }
            ]
        }

        response = self.post_api(Routes.ROUTE_CREATE_FLASHCARD['url'], flashcard_data)
        response_json = response[0]
        assert response_json['success']

    def test_get_flashcard_set(self):
        """Get the flashcard set that has been created
        """
        flashcard_set_data = {
            "userID": "1",
            "folder": "parent-name",
            "flashcardName": "My new set"
        }

        response = self.get_api(Routes.ROUTE_GET_FLASHCARD['url'], flashcard_set_data)
        response_json = response[0]
        assert response_json == {
            'cards': [
                '111197372349526489549352770627451434124951736187783527272260257031167665344330',
                '105807173781801679610690871524240887702929777887954072430940584241217379438024'
            ],
            'description': 'This is\nmy description',
            'name': 'My new set'
        }

    def test_get_invalid_flashcard_set(self):
        """Get a flashcard set that does not exist
        """
        flashcard_set_data = {
            "userID": "1",
            "folder": "parent-name",
            "flashcardName": "My new set 2"
        }

        response = self.get_api(Routes.ROUTE_GET_FLASHCARD['url'], flashcard_set_data)
        response_json = response[0]
        assert response_json is None

    def test_get_valid_cards(self):
        """Get the cards that have just been created
        """
        card_ids = [
            '111197372349526489549352770627451434124951736187783527272260257031167665344330',
            '105807173781801679610690871524240887702929777887954072430940584241217379438024'
        ]
        card_datas = [
            {
                "front": "Front 1",
                "back": "Back 1"
            },
            {
                "front": "Front 2",
                "back": "Back 2"
            }
        ]
        for index, card_id in enumerate(card_ids):
            response = self.get_api(Routes.ROUTE_GET_FLASHCARD_ITEM['url'], {"cardID": card_id})
            response_json = response[0]
            assert response_json == card_datas[index]

    def test_get_invalid_card_ids(self):
        """Get a card which does not exist
        """
        response = self.get_api(Routes.ROUTE_GET_FLASHCARD_ITEM['url'], {"cardID": "123"})
        response_json = response[0]
        assert response_json is None

    def test_get_all_cards(self):
        """Get the newly created cards
        """
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS['url'], {"userID": "1"})
        assert response == {
            'parent-name': {
                'My new set': {
                    'cards': {
                        '105807173781801679610690871524240887702929777887954072430940584241217379438024':{
                            'last_review': date.get_current_date(),
                            'review_status': '0.0'
                        },
                        '111197372349526489549352770627451434124951736187783527272260257031167665344330': {
                            'last_review': date.get_current_date(),
                            'review_status': '0.0'
                        }
                    },
                    'flashcardID': '110677275635593279644085421081590251557524150041496894982504548493525112413991',
                    'flashcardName': 'My new set'
                }
            }
        }

    def test_get_all_cards_invalid_user(self):
        """Get the cards for a user that does not exist
        """
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS['url'], {"userID": "invalidUser"})
        assert response == ['User has no flashcards']

    def test_create_set_with_no_folder(self):
        """
        Test to create a flashcard set where no folder needs to be created
        """
        # Create the flashcard set
        flashcard_data ={
            "userID": "2",
            "flashcardName": "My new set",
            "flashcardDescription": "This is\nmy description",
            "folder": "",
            "cards": [
                {
                    "front":"Front 1",
                    "back": "Back 1",
                    "reviewStatus":"0.0",
                    "lastReview": "27/04/2024"
                },
                {
                    "front":"Front 2",
                    "back": "Back 2",
                    "reviewStatus":"0.0",
                    "lastReview": "27/04/2024"
                }
            ]
        }

        response = self.post_api(Routes.ROUTE_CREATE_FLASHCARD['url'], flashcard_data)
        response_json = response[0]
        assert response_json['success']

        # Test the received data is as expected
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS['url'], {"userID": "2"})
        assert response == {
            'My new set': {
                'cards': {
                    '11165224605748429605987133234806552926285448832647417238217554731459014968083': {
                        'last_review': date.get_current_date(), 'review_status': '0.0'
                    },
                    '8966254591474678100251503343246943264986821768409576781069854701084739560388': {
                        'last_review': date.get_current_date(), 'review_status': '0.0'
                    }
                },
                'flashcardID': '77010080963356010550306826583619446652751483887907545209219499696331438679804',
                'flashcardName': 'My new set'
            }
        }

    def test_create_set_with_no_folder_again(self):
        """
        Test to create a flashcard set where no folder needs to be created
        but root node already has a flashcard set. The previous method created
        the first flashcard set
        """
        # Create the flashcard set
        flashcard_data ={
            "userID": "2",
            "flashcardName": "My second set",
            "flashcardDescription": "This is my second description",
            "folder": "",
            "cards": [
                {
                    "front":"Set 2 Front 1",
                    "back": "Set 2 Back 1",
                    "reviewStatus":"0.0",
                    "lastReview": "27/04/2024"
                },
                {
                    "front":"Set 2 Front 2",
                    "back": "Set 2 Back 2",
                    "reviewStatus":"0.0",
                    "lastReview": "27/04/2024"
                }
            ]
        }

        response = self.post_api(Routes.ROUTE_CREATE_FLASHCARD['url'], flashcard_data)
        response_json = response[0]
        assert response_json['success']

        # Test the received data is as expected
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS['url'], {"userID": "2"})
        assert response == {
            'My new set': {
                'cards': {
                    '11165224605748429605987133234806552926285448832647417238217554731459014968083': {
                        'last_review': date.get_current_date(), 'review_status': '0.0'
                    }, '8966254591474678100251503343246943264986821768409576781069854701084739560388': {
                        'last_review': date.get_current_date(), 'review_status': '0.0'
                    }
                },
                'flashcardID': '77010080963356010550306826583619446652751483887907545209219499696331438679804',
                'flashcardName': 'My new set'
            },
            'My second set': {
                'cards': {
                    '14411345015462126881349419665216417076805164447810086262725740317480970246813': {
                        'last_review': date.get_current_date(), 'review_status': '0.0'
                    },
                    '41774605504006205489430517012726202664719091872724290275059093038754913584254': {
                        'last_review': date.get_current_date(), 'review_status': '0.0'
                    }
                },
                'flashcardID': '71410789987014373933418573187523171269852949556947239129649365019529198596147',
                'flashcardName': 'My second set'
            }
        }

    def test_create_set_with_two_folders(self):
        """
        Test to create a flashcard set where 2 folders need to be created.
        Note that the userID is still 2 - this makes sure it works, even when
        there's multiple random cards in the root folder
        """
        # Create the flashcard set
        flashcard_data = {
            "userID": "2",
            "flashcardName": "Set with two folders",
            "flashcardDescription": "This set is within two folders",
            "folder": "my_folder1/my_second_folder",
            "cards": [
                {
                    "front":"Set 3 Front 1",
                    "back": "Set 3 Back 1",
                    "reviewStatus":"0.0",
                    "lastReview": "27/04/2024"
                },
                {
                    "front":"Set 3 Front 2",
                    "back": "Set 3 Back 2",
                    "reviewStatus":"0.0",
                    "lastReview": "27/04/2024"
                }
            ]
        }

        response = self.post_api(Routes.ROUTE_CREATE_FLASHCARD['url'], flashcard_data)
        response_json = response[0]
        assert response_json['success']

        # Test the received data is as expected
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS['url'], {"userID": "2"})
        print (response)
        assert response == {
            'My new set': {
                'cards': {
                    '11165224605748429605987133234806552926285448832647417238217554731459014968083': {
                        'last_review': date.get_current_date(), 'review_status': '0.0'
                    },
                    '8966254591474678100251503343246943264986821768409576781069854701084739560388': {
                        'last_review': date.get_current_date(), 'review_status': '0.0'
                    }
                },
                'flashcardID': '77010080963356010550306826583619446652751483887907545209219499696331438679804',
                'flashcardName': 'My new set'
            },
            'My second set': {
                'cards': {
                    '14411345015462126881349419665216417076805164447810086262725740317480970246813': {
                        'last_review': date.get_current_date(), 'review_status': '0.0'
                    },
                    '41774605504006205489430517012726202664719091872724290275059093038754913584254': {
                        'last_review': date.get_current_date(), 'review_status': '0.0'
                    }
                },
                'flashcardID': '71410789987014373933418573187523171269852949556947239129649365019529198596147', 'flashcardName': 'My second set'
            },
            'my_folder1': {
                'my_second_folder': {
                    'Set with two folders': {
                        'cards': {
                            '14905360164829162384003180375530029836752830300568461727668114186655222344365': {
                                'last_review': date.get_current_date(), 'review_status': '0.0'
                            },
                            '87153283362492593072257432791028666090314536797789089922601298297131913616718': {
                                'last_review': date.get_current_date(), 'review_status': '0.0'
                            }
                        },
                        'flashcardID': '14360501735762204737125532220923305690523298304800903823506033410378709611982',
                        'flashcardName': 'Set with two folders'
                    }
                }
            }
        }

    def test_create_set_that_already_exists(self):
        """
        Test to create a flashcard set that already exists. At the moment, this passes, overwwriting card data
        """
        self.test_create_set_with_no_folder()

    def test_move_card_to_location_that_exists(self):
        """
        Test to move flashcard set to a new location that exists and stores folders and sets
        """
        request_data = {
            "userID": "2",
            "currentLocation": "",
            "flashcardID": "My second set",
            "moveLocation": "my_folder1"
        }
        response = self.post_api(Routes.ROUTE_MOVE_FLASHCARD['url'], request_data)
        assert response == {'success': 'The flashcard set at /users/2/flashcards//My second set has been moved to my_folder1'}

        # Test the received data is as expected
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS['url'], {"userID": "2"})
        assert response == {
            'My new set': {
                'cards': {
                    '11165224605748429605987133234806552926285448832647417238217554731459014968083': {
                        'last_review': date.get_current_date(), 'review_status': '0.0'
                    },
                    '8966254591474678100251503343246943264986821768409576781069854701084739560388': {
                        'last_review': date.get_current_date(), 'review_status': '0.0'
                    }
                },
                'flashcardID': '77010080963356010550306826583619446652751483887907545209219499696331438679804',
                'flashcardName': 'My new set'
            },
            'my_folder1': {
                'My second set': {
                    'cards': {
                        '14411345015462126881349419665216417076805164447810086262725740317480970246813': {
                            'last_review': date.get_current_date(), 'review_status': '0.0'
                        },
                        '41774605504006205489430517012726202664719091872724290275059093038754913584254': {
                            'last_review': date.get_current_date(), 'review_status': '0.0'
                        }},
                        'flashcardID': '71410789987014373933418573187523171269852949556947239129649365019529198596147',
                        'flashcardName': 'My second set'
                    },
                    'my_second_folder': {
                        'Set with two folders': {
                            'cards': {
                                '14905360164829162384003180375530029836752830300568461727668114186655222344365': {
                                    'last_review': date.get_current_date(), 'review_status': '0.0'
                                },
                                '87153283362492593072257432791028666090314536797789089922601298297131913616718': {
                                    'last_review': date.get_current_date(), 'review_status': '0.0'
                                }
                            },
                            'flashcardID': '14360501735762204737125532220923305690523298304800903823506033410378709611982',
                            'flashcardName': 'Set with two folders'
                        }
                    }
                }
            }

    def test_move_card_to_new_location(self):
        """
        Test to move flashcard set to a new location that does not exist
        """
        request_data = {
            "userID": "2",
            "currentLocation": "my_folder1",
            "flashcardID": "My second set",
            "moveLocation": "languages/spanish"
        }
        response = self.post_api(Routes.ROUTE_MOVE_FLASHCARD['url'], request_data)
        assert response == {
            'success':
                'The flashcard set at /users/2/flashcards/my_folder1/My second set' +
                ' has been moved to languages/spanish'
        }

        # Test the received data is as expected
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS['url'], {"userID": "2"})
        assert response == {
            'languages': {
                'spanish': {
                    'My second set': {
                        'cards': {
                            '14411345015462126881349419665216417076805164447810086262725740317480970246813': {
                                'last_review': date.get_current_date(), 'review_status': '0.0'
                            },
                            '41774605504006205489430517012726202664719091872724290275059093038754913584254': {
                                'last_review': date.get_current_date(), 'review_status': '0.0'
                            }
                        },
                        'flashcardID': '71410789987014373933418573187523171269852949556947239129649365019529198596147',
                        'flashcardName': 'My second set'
                    },
                }
            },
            'My new set': {
                'cards': {
                    '11165224605748429605987133234806552926285448832647417238217554731459014968083': {
                        'last_review': date.get_current_date(), 'review_status': '0.0'
                    },
                    '8966254591474678100251503343246943264986821768409576781069854701084739560388': {
                        'last_review': date.get_current_date(), 'review_status': '0.0'
                    }
                },
                'flashcardID': '77010080963356010550306826583619446652751483887907545209219499696331438679804',
                'flashcardName': 'My new set'
            },
            'my_folder1': {
                    'my_second_folder': {
                        'Set with two folders': {
                            'cards': {
                                '14905360164829162384003180375530029836752830300568461727668114186655222344365': {
                                    'last_review': date.get_current_date(), 'review_status': '0.0'
                                },
                                '87153283362492593072257432791028666090314536797789089922601298297131913616718': {
                                    'last_review': date.get_current_date(), 'review_status': '0.0'
                                }
                            },
                            'flashcardID': '14360501735762204737125532220923305690523298304800903823506033410378709611982',
                            'flashcardName': 'Set with two folders'
                        }
                    }
                }
            }

    def test_move_non_existant_set(self):
        """
        Test to move a flashcard set that does not exist
        """
        request_data = {
            "userID": "2",
            "currentLocation": "my_invalid_folder",
            "flashcardID": "My non existant set",
            "moveLocation": "my_new_folder"
        }
        try:
            # This should return an error
            self.post_api(Routes.ROUTE_MOVE_FLASHCARD['url'], request_data)
            assert False
        except Exception:
            assert True

    def test_create_card_goal(self):
        """
        Test to create a card goal that should be failed
        """
        request_data = {
            "userID": "2",
            "cardsToRevise": 5,
            "endDate": "01/01/2022"
        }
        response = self.post_api(Routes.ROUTE_CREATE_CARD_GOAL['url'], request_data)
        assert response == {'success': 'Goal created successfully'}

    def test_create_xp_goal(self):
        """
        Test to create an XP goal that should be in progress
        """
        request_data = {
            "userID": "2",
            "goalXP": 5,
            "endDate": date.get_current_date()
        }
        response = self.post_api(Routes.ROUTE_CREATE_XP_GOAL['url'], request_data)
        assert response == {'success': 'Goal created successfully'}

    def test_create_completed_goal(self):
        """
        Test for a goal that should be completed
        """
        request_data = {
            "userID": "2",
            "goalXP": 0,
            "endDate": date.get_current_date()
        }
        response = self.post_api(Routes.ROUTE_CREATE_XP_GOAL['url'], request_data)
        assert response == {'success': 'Goal created successfully'}

    def test_update_goal_status(self):
        """
        Make sure the update-goal-status route works
        """
        # Test case 1: The function works
        request_data = {
            "userID": "2"
        }
        response = self.post_api(Routes.ROUTE_UPDATE_GOAL_STATUS['url'], request_data)
        assert response == {
            "39044324231811698044465195446002182549597141351219460081680269200524449525456": {
                "data": {
                "goal_xp": 0,
                "start_date": date.get_current_date(),
                "starting_xp": "0"
                },
                "end_date": date.get_current_date(),
                "fail_date": "",
                "status": "completed",
                "title": "Gain 0 XP by " + date.get_current_date(),
                "type": "XP"
            },
            "54343396708103413832968857573083357508652358450712125381004588668888522542831": {
                "data": {
                "goal_xp": 5,
                "start_date": date.get_current_date(),
                "starting_xp": "0"
                },
                "end_date": date.get_current_date(),
                "fail_date": "",
                "status": "in progress",
                "title": "Gain 5 XP by " + date.get_current_date(),
                "type": "XP"
            },
            "9902473624918826751793822303272600295431210547080501995768909442922844439697": {
                "data": {
                "cards_revised_so_far": "0",
                "cards_to_revise": 5
                },
                "end_date": "01/01/2022",
                "fail_date": date.get_current_date(),
                "status": "failed",
                "title": "Revise 5 cards by 01/01/2022",
                "type": "Card"
            }
        }

        # Test case 2: The card exists
        request_data = {
            "userID": "2",
            "goalID": "9902473624918826751793822303272600295431210547080501995768909442922844439697",
            "newEndDate": "28/05/2027",
            "newTitle": "My new title",
            "newCardsToRevise": 200
        }
        response = self.post_api(Routes.ROUTE_EDIT_CARD_GOAL['url'], request_data)
        assert response == {'success': 'Goal updated successfully'}

        # Test case 3: The card does not exist
        request_data = {
            "userID": "2",
            "goalID": "This card does not exist",
            "newEndDate": "28/05/2027",
            "newTitle": "My new title",
            "newCardsToRevise": 200
        }
        try:
            # This line should fail
            response = self.post_api(Routes.ROUTE_EDIT_CARD_GOAL['url'], request_data)
            assert False
        except Exception:
            assert True

        # Test case 4: Editing a valid XP card
        request_data = {
            "userID": "2",
            "goalID": "54343396708103413832968857573083357508652358450712125381004588668888522542831",
            "newEndDate": "29/05/2027",
            "newTitle": "My new xp title",
            "newGoalXP": 50
        }
        response = self.post_api(Routes.ROUTE_EDIT_XP_GOAL['url'], request_data)
        assert response == {'success': 'Goal updated successfully'}

        # Test case 5: Editing an XP card which does not exist
        request_data = {
            "userID": "2",
            "goalID": "This goal does not exist",
            "newEndDate": "29/05/2027",
            "newTitle": "My new xp title",
            "newGoalXP": 50
        }
        try:
            # This line should fail
            response = self.post_api(Routes.ROUTE_EDIT_CARD_GOAL['url'], request_data)
            assert False
        except Exception:
            assert True

        # Test case 6: The cards have been edited properly
        request_data = {
            "userID": "2"
        }
        response = self.post_api(Routes.ROUTE_UPDATE_GOAL_STATUS['url'], request_data)
        print (response)
        assert response == {
            "39044324231811698044465195446002182549597141351219460081680269200524449525456": {
                "data": {
                "goal_xp": 0,
                "start_date": date.get_current_date(),
                "starting_xp": "0"
                },
                "end_date": date.get_current_date(),
                "fail_date": "",
                "status": "completed",
                "title": "Gain 0 XP by " + date.get_current_date(),
                "type": "XP"
            },
            "54343396708103413832968857573083357508652358450712125381004588668888522542831": {
                "data": {
                "goal_xp": 50,
                "start_date": date.get_current_date(),
                "starting_xp": "0"
                },
                "end_date": "29/05/2027",
                "fail_date": "",
                "status": "in progress",
                "title": "My new xp title",
                "type": "XP"
            },
            "9902473624918826751793822303272600295431210547080501995768909442922844439697": {
                "data": {
                "cards_revised_so_far": "0",
                "cards_to_revise": 200
                },
                "end_date": "28/05/2027",
                "fail_date": date.get_current_date(),
                "status": "failed", # Failed because it was already failed before end_date was updated
                "title": "My new title",
                "type": "Card"
            }
        }

        # Test case 7: A valid goal is deleted
        request_data = {
            "userID": "2",
            "goalID": "54343396708103413832968857573083357508652358450712125381004588668888522542831"
        }
        response = self.delete_api(Routes.ROUTE_DELETE_GOAL['url'], request_data)
        assert response == {'success': 'Goal deleted successfully'}

        # Test case 8: An invalid goal is deleted - this does not actually have an error
        request_data = {
            "userID": "2",
            "goalID": "Invalid goal id"
        }
        response = self.delete_api(Routes.ROUTE_DELETE_GOAL['url'], request_data)
        assert response == {'success': 'Goal deleted successfully'}

        # Test case 8: Check the goal is actually deleted
        request_data = {
            "userID": "2"
        }
        response = self.post_api(Routes.ROUTE_UPDATE_GOAL_STATUS['url'], request_data)
        print (response)
        assert response == {
            "39044324231811698044465195446002182549597141351219460081680269200524449525456": {
                "data": {
                "goal_xp": 0,
                "start_date": date.get_current_date(),
                "starting_xp": "0"
                },
                "end_date": date.get_current_date(),
                "fail_date": "",
                "status": "completed",
                "title": "Gain 0 XP by " + date.get_current_date(),
                "type": "XP"
            },
            "9902473624918826751793822303272600295431210547080501995768909442922844439697": {
                "data": {
                "cards_revised_so_far": "0",
                "cards_to_revise": 200
                },
                "end_date": "28/05/2027",
                "fail_date": date.get_current_date(),
                "status": "failed", # Failed because it was already failed before end_date was updated
                "title": "My new title",
                "type": "Card"
            }
        }

    def test_update_heatmap(self):
        """
        Test the update-heatmap method
        """
        # Test case 1: User exists
        request_data = {
            "userID": "1"
        }
        response = self.post_api(Routes.ROUTE_UPDATE_HEATMAP['url'], request_data)
        assert response == {"05-06-2024": "2"}

        # Test case 2: User does not exist
        request_data = {
            "userID": "Invalid User"
        }
        try:
            # This should not run
            response = self.post_api(Routes.ROUTE_UPDATE_HEATMAP['url'], request_data)
            assert False
        except:
            assert True

        # Test case 3: User exists when fetching heatmap data
        request_data = {
            "userID": "1"
        }
        response = self.post_api(Routes.ROUTE_GET_HEATMAP['url'], request_data)
        assert response == {"05-06-2024": "2"}

        # Test case 4: User does not exist when fetching heatmap data
        request_data = {
            "userID": "Invalid User"
        }
        try:
            # This should not run
            response = self.post_api(Routes.ROUTE_GET_HEATMAP['url'], request_data)
            assert False
        except:
            assert True
