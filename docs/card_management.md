## Create Flashcard
### **Endpoint:** /create-flashcard
### **Method:** POST
Create or edit a set of flashcards for the user.


### Parameters

#### **Request Body Parameters**
| Parameter               | Description                                                                       | Type    | Required/Optional |
|-------------------------|-----------------------------------------------------------------------------------|---------|-------------------|
| 1. userID               | The ID of the user editing or creating the set of flashcards                      | String  | Required          |
| 2. flashcardName        | The name of the flashcard set                                                     | String  | Required          |
| 3. flashcardDescription | The description of the flashcard set                                              | String  | Required          |
| 4. cards                | A list of flashcards. Each flashcard has a front, back, review status, and last review properties.| list| Required          |
| 4.1. front              | The front side content of the flashcard                                           | String  | Required          |
| 4.2. back               | The back side content of the flashcard                                            | String  | Required          |
| 4.3. reviewStatus       | The review status of the flashcard                                                | String  | Required          |
| 4.4. lastReview         | The date of the last review of the flashcard                                      | String  | Required          |


## Request Example

```
    Curl  -X POST  -H "Content-Type: application/json” -d {'userID': 'user1', 'flashcardName': 'Expense Tracker', 'flashcardDescription': 'A set of flashcards for tracking expenses', 'cards': [{'front': 'Monday', 'back': 'Evening', 'reviewStatus': '0.0', 'lastReview': '01-01-2024'}, {'front': 'Tuesday', 'back': 'Morning', 'reviewStatus': '0.0', 'lastReview': '01-01-2024'}, {'front': 'Wednesday', 'back': 'Afternoon', 'reviewStatus': '0.0', 'lastReview': '01-01-2024'}]} http://dolphinflashcards.com/api/create-flashcard
```




## Response Example

**Success Response**<br>
HTTP Status: 200

```
 {
    "success": True
 }
```

**Error Response**<br>
HTTP Status: 400

```
{
    "error": Your supplied json keys do not match the expected format. The request should be in the format: {'userID': 'string', 'flashcardName': 'string', 'flashcardDescription': 'string', 'cards': [{'front': 'string', 'back': 'string', 'reviewStatus': 'string', 'lastReview': 'string'}]}"
}

```


*********************************


## Get Flashcard
### **Endpoint:** /get-flashcard
### **Method:** GET
Get a flashcard based on the name and user ID.

### Parameters

#### **Request Body Parameters**
| Parameter            | Description                                                                       | Type    | Required/Optional |
|----------------------|-----------------------------------------------------------------------------------|---------|-------------------|
| userID               | The ID of the user whose flashcard is to be requested                             | String  | Required          |
| flashcardName        | The name of the flashcard set to be requested                                     | String  | Required          |


## Request Example
```
    Curl -X POST -H "Content-Type: application/json” -d {"userID": "user1", "flashcardName": "Expense Tracker"} http://dolphinflashcards.com/api/get-flashcard

```

## Response Example

**Success Response**<br>
HTTP Status: 200

```
{
    "userID": "user1",
    "flashcardName": "Expense Tracker",
    "flashcardDescription": "A set of flashcards for tracking expenses",
    "cards": [
        {
            "front": "Monday",
            "back": "Evening",
            "reviewStatus": "0.0",
            "lastReview": "01-01-2024"
        },
        {
            "front": "Tuesday",
            "back": "Morning",
            "reviewStatus": "0.0",
            "lastReview": "01-01-2024"
        },
        {
            "front": "Wednesday",
            "back": "Afternoon",
            "reviewStatus": "0.0",
            "lastReview": "01-01-2024"
        }
    ]
}

```

**Error Response**<br>
HTTP Status: 400

```
{
    "error": Your supplied json keys do not match the expected format. The request should be in the format: {'userID': 'string', 'flashcardName': 'string'}
}

```


*********************************

## Get Today Cards
### **Endpoint:** /get-today-cards
### **Method:** GET
Get all the flashcards to be learned today for a user

### Parameters

#### **Request Body Parameters**
| Parameter            | Description                                                                       | Type    | Required/Optional |
|----------------------|-----------------------------------------------------------------------------------|---------|-------------------|
| userID               | The ID of the user whose flashcards are to be learned today                       | String  | Required          |


## Request Example
```
    Curl -X POST -H "Content-Type: application/json” -d {"userID": "user1"} http://dolphinflashcards.com/api/get-today-cards

```


## Response Example

**Success Response**<br>
HTTP Status: 200

```
[
        {
            "front": "Monday",
            "back": "Evening",
            "reviewStatus": "0.0",
            "lastReview": "01-01-2024"
        },
        {
            "front": "Tuesday",
            "back": "Morning",
            "reviewStatus": "0.0",
            "lastReview": "05-01-2024"
        },
        {
            "front": "Wednesday",
            "back": "Afternoon",
            "reviewStatus": "0.0",
            "lastReview": "15-01-2024"
        }
]
```

**Error Response**<br>
HTTP Status: 400

```
{
    "error": Your supplied json keys do not match the expected format. The request should be in the format: {'userID': 'string'}
}

```
