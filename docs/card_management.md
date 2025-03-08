## Create Flashcard
### **Endpoint:** /create-flashcard
### **Method:** POST
Create or edit a flashcard set for a user. Flashcards contain front, back, review status, and last review date properties.


### Parameters

#### **Request Body Parameters**
| Parameter               | Description                                                                       | Type    | Required/Optional |
|-------------------------|-----------------------------------------------------------------------------------|---------|-------------------|
| 1. userID               | The unique identity of the user editing or creating flashcards.                         | String  | Required          |
| 2. flashcardName        | The name of the flashcard set.                                                     | String  | Required          |
| 3. flashcardDescription | The description of the flashcard set.                                              | String  | Required          |
| 4. folder               | The name of the folder containing the flashcard sets. Set to `""` to set as a top level flashcard, otherwise set it to the parent folder name. If there are multiple parent folders, add the folder name seperated by numeric figures.| String | Required |
| 5. cards                | A list of flashcards. Each flashcard object has a `front`, `back`, `review status`, and `last review` properties.| array | Required          |
| 5.1. front              | The front side content of the flashcard.                                          | String  | Required          |
| 5.2. back               | The back side content of the flashcard.                                           | String  | Required          |
| 5.3. reviewStatus       | The review status of the flashcard.                                               | String  | Required          |
| 5.4. lastReview         | The date when the flashcard was last reviewed, in dd/mm/yyyy format.              | String  | Required          |


## Request Example

```
    curl  -X POST  -H "Content-Type: application/json” -d {'userID': 'user1', 'flashcardName': 'firstCard', 'flashcardDescription': 'my first flashcard', 'folder': 'My first folder', 'cards': [{'front': 'Monday', 'back': 'Evening', 'reviewStatus': '0.0', 'lastReview': '01-01-2024'}, {'front': 'Tuesday', 'back': 'Morning', 'reviewStatus': '0.0', 'lastReview': '08-07-2024'}, {'front': 'Wednesday', 'back': 'Afternoon', 'reviewStatus': '0.0', 'lastReview': '05-07-2024'}]} http://dolphinflashcards.com/api/create-flashcard
```




## Response Example

**Success Response**<br>
HTTP Status: 200

```
 [
    {
        "success": true
    },
    200
]
```

**Error Response**<br>
HTTP Status: 400
A bad request error. Returned when the request body parameters are not in the expected JSON format.


```

{
    "error": "Your supplied json keys do not match the expected format. The request should be in the format: {'userID': '', 'flashcardName': '', 'flashcardDescription': '', 'folder': '', 'cards': [{'front': '', 'back': '', 'reviewStatus': '', 'lastReview': ''}]}"
}

```


<br></br>
<br></br>
*********************************

## Create Folder
### **Endpoint:** /create-folder
### **Method:** POST
Create a folder for the user.

### Parameters


#### **Request Body Parameters**
| Parameter            | Description                                                                       | Type    | Required/Optional |
|----------------------|-----------------------------------------------------------------------------------|---------|-------------------|
| userID               | The unique identity of the user creating a folder.                                | String  | Required          |
| folder               | The name or title of the folder to be created.                                    | String  | Required          |


## Request Example
```
    Curl -X POST -H "Content-Type: application/json” -d {"userID": "user1", "folder": "firstFolder"} http://dolphinflashcards.com/api/create-folder

```

 
## Response Example

**Success Response**<br>
HTTP Status: 200

```
{
    "success": "Folder parent-name created"
}
```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| success              | Indicates that the folder has been successfully created.                          | String  | 



**Error Response**<br>
HTTP Status: 400
A bad request error. Returned when the request body parameters are not in the expected JSON format.


```

{
    "error": "Your supplied json keys do not match the expected format. The request should be in the format: {'userID': '', 'folder': ''}"
}

```

**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error and provides a possible solution.               | string  | 





<br></br>
*********************************

## Get Flashcard
### **Endpoint:** /get-flashcard
### **Method:** GET
Retrieve a flashcard set based on the specified name, folder, and user ID. Returns null if the request body contains an invalid flashcard name and/or folder name.

### Parameters

#### **Request Body Parameters**
| Parameter            | Description                                                                       | Type    | Required/Optional |
|----------------------|-----------------------------------------------------------------------------------|---------|-------------------|
| userID               | The unique identifier of the user who owns the flashcard.                         | String  | Required          |
| folder               | The name of the folder containing the flashcard.                                  | String  | Required          |
| flashcardName        | The name or title of the flashcard to retrieve.                                   | String  | Required          |


## Request Example
```
    Curl -X GET -H "Content-Type: application/json” -d {"userID": "user1", "folder": "firstFolder", "flashcardName": "firstCard"} http://dolphinflashcards.com/api/get-flashcard

```

## Response Examples

**Success Response**<br>

HTTP Status: 200

```
[
    {
        "cards": [
            "34491285524799755658107639929006996702748532692311513250222807523742322598240"
        ],
        "description": "my first flashcard",
        "name": "firstCard"
    },
    200
]

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| cards                | The card ID, a 77-digits unique identifier of the exact flashcard retrieved from the folder.| array   | 
| description          | The description of the flashcard.                                                 | String  |
| name                 | The name of the flashcard.                                                        | String  |



**Error Response**<br>
HTTP Status: 400
A bad request error. Returned when the request body parameters are not in the expected JSON format.


```
{
    "error": "Your supplied json keys do not match the expected format. The request should be in the format: {'userID': '', 'folder': '', 'flashcardName': ''}"
}

```

**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error and provides a possible solution.               | string  | 



<br></br>
*********************************

## Get Flashcard
### **Endpoint:** /get-flashcard
### **Method:** POST
Retrieve a flashcard set based on the specified name, folder, and user ID. Returns null if the request body contains an invalid flashcard name and/or folder name.

### Parameters

#### **Request Body Parameters**
| Parameter            | Description                                                                       | Type    | Required/Optional |
|----------------------|-----------------------------------------------------------------------------------|---------|-------------------|
| userID               | The unique identifier of the user who owns the flashcard.                         | String  | Required          |
| folder               | The name of the folder containing the flashcard.                                  | String  | Required          |
| flashcardName        | The name or title of the flashcard to retrieve.                                   | String  | Required          |


## Request Example
```
    Curl -X GET -H "Content-Type: application/json” -d {"userID": "user1", "folder": "firstFolder", "flashcardName": "firstCard"} http://dolphinflashcards.com/api/get-flashcard

```

## Response Examples

**Success Response**<br>

HTTP Status: 200

```
[
    {
        "cards": [
            "34491285524799755658107639929006996702748532692311513250222807523742322598240"
        ],
        "description": "my first flashcard",
        "name": "firstCard"
    },
    200
]

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| cards                | The card ID, a 77-digits unique identifier of the exact flashcard retrieved from the folder.| array   | 
| description          | The description of the flashcard.                                                 | String  |
| name                 | The name of the flashcard.                                                        | String  |



**Error Response**<br>
HTTP Status: 400
A bad request error. Returned when the request body parameters are not in the expected JSON format.


```
{
    "error": "Your supplied json keys do not match the expected format. The request should be in the format: {'userID': '', 'folder': '', 'flashcardName': ''}"
}

```

**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error and provides a possible solution.               | string  | 





<br></br>
*********************************

## Get Flashcard Item
### **Endpoint:** /get-flashcard-item
### **Method:** GET
Get a flashcard item based on the card ID. Flashcard sets store multiple flashcard items, which are the individual flashcards.

### Parameters

#### **Request Body Parameters**
| Parameter            | Description                                                                       | Type    | Required/Optional |
|----------------------|-----------------------------------------------------------------------------------|---------|-------------------|
| cardID               | A 77-digits unique identifier of the specific card to retrieve from the flashcard set.| String  | Required    |


## Request Example
```
    Curl -X GET -H "Content-Type: application/json” -d {"cardID": "34491212345799755658107639929006996702748532692311513250209090523742322511111"} http://dolphinflashcards.com/api/get-flashcard-item

```

## Response Example

**Success Response**<br>
HTTP Status: 200

```
[
    {
        "back": "Evening",
        "front": "Monday"
    },
    200
]

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| back                 | The back side content of the flashcard.                                           | String  | 
| front                | The front side content of the flashcard.                                          | String  |





**Error Response**<br>
HTTP Status: 400
A bad request error. Returned when the request body parameter is not in the expected JSON format.


```
{
    "error": "Your supplied json keys do not match the expected format. The request should be in the format: {'cardID': ''}"
}

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error and provides a possible solution.               | string  | 



<br></br>
*********************************

## Get Flashcard Item
### **Endpoint:** /get-flashcard-item
### **Method:** POST
Get a flashcard item based on the card ID. Flashcard sets store multiple flashcard items, which are the individual flashcards.

### Parameters

#### **Request Body Parameters**
| Parameter            | Description                                                                       | Type    | Required/Optional |
|----------------------|-----------------------------------------------------------------------------------|---------|-------------------|
| cardID               | The unique identifier of the specific card to retrieve from the flashcard set.    | String  | Required          |


## Request Example
```
    Curl -X POST -H "Content-Type: application/json” -d {"cardID": "34491212345799755658107639929006996702748532692311513250209090523742322511111"} http://dolphinflashcards.com/api/get-flashcard-item

```

## Response Example

**Success Response**<br>
HTTP Status: 200

```
[
    {
        "back": "Evening",
        "front": "Monday"
    },
    200
]

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| back                 | The back side content of the flashcard.                                           | String  | 
| front                | The front side content of the flashcard.                                          | String  |





**Error Response**<br>
HTTP Status: 400
A bad request error. Returned when the request body parameter is not in the expected JSON format.


```
{
    "error": "Your supplied json keys do not match the expected format. The request should be in the format: {'cardID': ''}"
}

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error and provides a possible solution.               | string  | 



<br></br>
*********************************

## Get Today Cards
### **Endpoint:** /get-today-cards
### **Method:** POST
Get all the flashcards to be learned today for a user. If a card's review status is 0.0, it is not started; if it is 0.x, it is actively studying; if it is >= 1.x, it is learned.

### Parameters

#### **Request Body Parameters**
| Parameter            | Description                                                                       | Type    | Required/Optional |
|----------------------|-----------------------------------------------------------------------------------|---------|-------------------|
| userID               | The identity of the user learning the flashcards today.                           | String  | Required          |


## Request Example
```
    Curl -X POST -H "Content-Type: application/json” -d {"userID": "user1"} http://dolphinflashcards.com/api/get-today-cards

```


## Response Examples
Returns the string: `"User has no flashcards"` when supplied an invalid userID.

**Success Response**<br>
HTTP Status: 200

```
{
    "Folder": {
        "Flashcard": {
            "cards": {
                "cardID": {
                    "last_review": "02/07/2024",
                    "review_status": "0.0"
                }
            },
            "flashcardID": "6796878844471389968582206160161573797336081897254331165973477783999823937257",
            "flashcardName": "firstCard"
        },
        "secondFlashcard": {
            "cards": {
                "cardID": {
                    "last_review": "03/07/2024",
                    "review_status": "0.0"
                }
            },
            "flashcardID": "6796878844471389968582206160161573797336081897254331165973477783999823937257",
            "flashcardName": "secondCard"
        }
    },
   
    "top-level-parent-name": { 
        "parent-name-2": {
            "parent-name-3": {
                "Flashcard": {
                    "cards": {
                        "37117561297934638728634279553695852046447234529246203144425130738760147640868": {
                            "last_review": "02/07/2024",
                            "review_status": "0.0"
                        }
                    },
                    "flashcardID": "6796878844881389968582206160161573797336081897254331165973477783999823937257",
                    "flashcardName": "firstCard"
                }
            }
        }
    }
}

```

**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| Folder               | A parent folder containing flashcards.                                            | Object  | 
| Flashcard            | The first flashcard in the current folder.                                        | Object  |
| cards                | An object contaning the `cardID` of the current flashcard.                        | Object  |
| cardID               | A 77-digit unique identifier for a specific card item within the flashcard. Has last_review and review_status properties. | String  |
| last_review          | The date when the card was last reviewed, formatted as dd/mm/yyyy.                | String  |
| review_status        | The current review status of the card, where 0.0 indicates that the card is not started; 0.x indicates that the card is actively studying; and >= 1.x indicates that the card is learned.          | String  |
| flashcardID          | A 77-digit unique identifier of the current flashcard. This is different from cardID.| String  |
| flashcardName        | The name of the current flashcard.                                                        | String  |
| secondFlashcard      | Another flashcard within the current folder.                                      | String  |
| top-level-parent-name| Another parent folder within the same account that contains nested folders and flashcards. It has a different naming convention from the previous folder. | String  |
| parent-name-2        | A folder nested within the `top-level-parent-name` folder that further organizes flashcards. | String  |
| parent-name-3        | A folder nested within the parent-name-2 folder, containing specific flashcards.  | String  |


**Error Response**<br>
HTTP Status: 400
A bad request error. Returned when the request body parameters is not in the expected JSON format.


```
{
    "error": "Your supplied json keys do not match the expected format. The request should be in the format: {'userID': ''}"
}
```


**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error and provides a possible solution.               | string  | 



<br></br>
******************************

## Get All Cards
### **Endpoint:** /get-all-cards
### **Method:** POST
Get all the flashcards created by a user.

### Parameters

#### **Request Body Parameters**
| Parameter            | Description                                                                       | Type    | Required/Optional |
|----------------------|-----------------------------------------------------------------------------------|---------|-------------------|
| userID               | Identifies the user who wants to retrieve their flashcards.                       | String  | Required          |


## Request Example
```
    Curl -X POST -H "Content-Type: application/json” -d {"userID": "user1"} http://dolphinflashcards.com/api/get-all-cards

```

## Response Examples


**Success Response**<br>
HTTP Status: 200


```
{
    "Folder": {
        "Flashcard": {
            "cards": {
                "cardID": {
                    "last_review": "02/07/2024",
                    "review_status": "0.0"
                }
            },
            "flashcardID": "6796878844471389968582206160161573797336081897254331165973477783999823937257",
            "flashcardName": "firstCard"
        },
        "secondFlashcard": {
            "cards": {
                "cardID": {
                    "last_review": "03/07/2024",
                    "review_status": "0.0"
                }
            },
            "flashcardID": "6796878844471389968582206160161573797336081897254331165973477783999823937257",
            "flashcardName": "secondCard"
        }
    },
    "top-level-parent-name": { 
        "parent-name-2": {
            "parent-name-3": {
                "flashcardName": {
                    "cards": {
                        "37117561297934638728634279553695852046447234529246203144425130738760147640868": {
                            "last_review": "02/07/2024",
                            "review_status": "0.0"
                        }
                    },
                    "flashcardID": "6796878844881389968582206160161573797336081897254331165973477783999823937257",
                    "flashcardName": "firstCard"
                }
            }
        }
    }
}
```

**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| Folder               | A parent folder containing flashcards.                                            | Object  | 
| Flashcard            | The first flashcard in the current folder.                                        | Object  |
| cards                | An object contaning the `cardID` of the current flashcard.                        | Object  |
| cardID               | A 77-digit unique identifier for a specific card item within the flashcard. Has last_review and review_status properties. | String  |
| last_review          | The date when the card was last reviewed, formatted as dd/mm/yyyy.                | String  |
| review_status        | The current review status of the card, where 0.0 indicates that the card is not started; 0.x indicates that the card is actively studying; and >= 1.x indicates that the card is learned.          | String  |
| flashcardID          | A 77-digit unique identifier of the current flashcard. This is different from cardID.| String  |
| flashcardName        | The name of the current flashcard.                                                        | String  |
| secondFlashcard      | Another flashcard within the current folder.                                      | String  |
| top-level-parent-name| Another parent folder within the same account that contains nested folders and flashcards. It has a different naming convention from the previous folder. | String  |
| parent-name-2        | A folder nested within the `top-level-parent-name` folder that further organizes flashcards. | String  |
| parent-name-3        | A folder nested within the parent-name-2 folder, containing specific flashcards.  | String  |


**Error Response**<br>
HTTP Status: 400
A bad request error. Returned when the request body parameter is not in the expected JSON format.


```
{
    "error": "Your supplied json keys do not match the expected format. The request should be in the format: {'userID': ''}"
}

```


**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error and provides a possible solution.               | string  | 




<br></br>
******************************

## Move Flashcard Set
### **Endpoint:** /move-flashcard-set
### **Method:** POST
Move a flashcard set to a new location.

### Parameters

#### **Request Body Parameters**
| Parameter            | Description                                                                       | Type    | Required/Optional |
|----------------------|-----------------------------------------------------------------------------------|---------|-------------------|
| userID               | The identity of the user moving their flashcard set to a new location.            | String  | Required          |
| currentLocation      | The current folder path.                                                          | String  | Required          |
| flashcardID          | A 77-digit unique identifier of the flashcard. This is different from cardID.     | String  | Required          |
| moveLocation         | The destination folder path.                                                      | String  | Required          |


## Request Example
```
    Curl -X POST -H "Content-Type: application/json” -d {"userID": "user1", "currentLocation": "top-level-parent-name/parent-name-2", "flashcardID": "22456683691481111127441553357143855166282726011111761972795191711430217049598", "moveLocation": "My-third-folder"} http://dolphinflashcards.com/api/move-flashcard-set

```


## Response Examples


**Success Response**<br>
HTTP Status: 200

```
{
    "success": "The flashcard set at /users/user700430/flashcards/top-level-parent-name/parent-name-2/parent-name-3/flashcardName/6796878844881389968582206160161573797336081897254331165973477783999823937257 has been moved to My third folder"
}

```


**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| success              | Indicates that the flashcard set at the specified path has been successfully moved to a new folder. | String  | 


**Error Response**<br>
HTTP Status: 400
A bad request error. Returned when the request body parameters are not in the expected JSON format.


```
{
    "error": "Your supplied json keys do not match the expected format. The request should be in the format: {'userID': '', 'currentLocation': '', 'flashcardID': '', 'moveLocation': ''}"
}

```


**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error and provides a possible solution.               | string  | 

<br></br>
******************************

Certainly! I'll add documentation for the import from Quizlet route to the file. Here's the updated content to be added to the `/root/Dolphin-Flashcard-App/docs/card_management.md` file:

**File: /root/Dolphin-Flashcard-App/docs/card_management.md**

```markdown
<br></br>
******************************

## Import from Quizlet
### **Endpoint:** /import-from-quizlet
### **Method:** POST
Import flashcards from Quizlet-formatted text.

### Parameters

#### **Request Body Parameters**
| Parameter            | Description                                                                       | Type    | Required/Optional |
|----------------------|-----------------------------------------------------------------------------------|---------|-------------------|
| jwtToken              | The unique identity of the user importing flashcards.                             | String  | Required          |
| folder               | The name of the folder where the flashcards will be stored.                       | String  | Required          |
| flashcards           | The Quizlet-formatted text containing the flashcards.                             | String  | Required          |
| term_def_separator   | The separator used between terms and definitions.                                 | String  | Required          |
| term_separator       | The separator used between different flashcards.                                  | String  | Required          |
| flashcard_name       | The name for the imported flashcard set.                                          | String  | Required          |

### Request Body Example
```
 '{
    "jwtToken": token",
    "folder": "My Flashcards",
    "flashcards": "Term 1:Definition 1;Term 2:Definition 2;Term 3:Definition 3",
    "term_def_separator": ":",
    "term_separator": ";",
    "flashcard_name": "Imported from Quizlet"
}' /api/import-from-quizlet
```

### Response Examples

**Success Response**<br>
HTTP Status: 200

```json
{
    "success": "Flashcards imported successfully"
}
```

**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| success              | Indicates that the flashcards were successfully imported.                         | 

**Error Response**<br>
HTTP Status: 400
Returned when the request body parameters are not in the expected format or if the flashcard data is invalid.

```json
{
    "error": "Invalid flashcard format"
}
```

**Error Response**<br>
HTTP Status: 400
Returned when the flashcard set name already exists.

```json
{
    "error": "Flashcard set name already exists"
}
```

**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error.                                                | String  |
```

