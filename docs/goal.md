## Create XP Goal
### **Endpoint:** /create-xp-goal
### **Method:** POST

Create an experience points (XP) goal for the user. XP goals have an `ID`, `type`, `title`, `end date`, `status` (failed, completed, or in progress), `fail date` (if failed), and `data storing` (start date, starting XP, desired XP) properties.

### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | Identifies the user who is creating an XP goal.                                           | String  | Required          |
| goalXP       | The desired amount of experience points (XP) the user aims to achieve with this goal.     | String  | Required          |
| endDate      | The date by which the user intends to achieve the XP goal, in dd/mm/yyyy format.          | String  | Required          |




## Request Example

```
    Curl -X POST -H "Content-Type: application/json” -d {"userID": "123", "goalXP": "100", "endDate": "30/01/2024" } http://dolphinflashcards.com/api/create-xp-goal

```


## Response Example

**Success Response**<br>
HTTP Status: 200
```
    {
        "success": "Goal created successfully"
    }

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| success              | Provides additional information confirming that the request was successful.       | String  | 



**Error Response**<br>
HTTP Status: 400
A bad request error. Returned when the request body parameters are not in the expected JSON format.


```
{
    "error": "Your supplied json keys do not match the expected format. The request should be in the format: {'userID': '', 'goalXP': '', 'endDate': ''}"
}

```

**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error and provides a possible solution.               | string  | 



<br></br>
****************************************

## Create Card Goal
### **Endpoint:** /create-card-goal
### **Method:** POST
Create a card goal for the user. Card goals have the following properties: `ID`, `type` (XP), `title`, `end date`, `status` (failed, completed, or in progress), `fail date` (if failed), and `data storing` (cards revised so far, starting XP, desired cards to revise). A card goal is similar to an XP goal but differs in the data section.

### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | Identifies the user who is creating a card goal.                                          | String  | Required          |
| cardsToRevise| The number of cards the user intends to revise for the current goal.                      | String  | Required          |
| endDate      | The date by which the user intends to achieve the card revision goal, in dd/mm/yyyy format. | String| Required |




## Request Example

```
    Curl -X POST -H "Content-Type: application/json” -d {"userID": "user1", "cardsToRevise": "5", "endDate": "30/07/2024" } http://dolphinflashcards.com/api/create-card-goal

```


## Response Example

**Success Response**<br>
HTTP Status: 200
```
    {
        "success": "Goal created successfully"
    }

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| success              | Provides additional information confirming that the request was successful.       | String  | 




**Error Response**<br>
HTTP Status: 400
A bad request error. Returned when the request body parameters are not in the expected JSON format.


```
{
    "error": "Your supplied json keys do not match the expected format. The request should be in the format: {'userID': '', 'cardsToRevise': '', 'endDate': ''}"
}

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error and provides a possible solution.               | string  | 




<br></br>
****************************************

## Update Goal Status
### **Endpoint:** /update-goal-status
### **Method:** POST
Update the status of a goal. The possible values for the status of a goal are `completed`, `in progress`, or `failed`. Returns an empty object when the userID provided is invalid.
### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | An identifier for the user who is updating the goal status.                               | String  | Required          |


## Request Example

```
    Curl -X POST -H "Content-Type: application/json” -d '{"userID": "user1"}' http://dolphinflashcards.com/api/update-goal-status

```

## Response Example

**Success Responses**<br>

```
{
    "goalID-1": {
        "data": {
            "cards_revised_so_far": "0",
            "cards_to_revise": "4"
        },
        "end_date": "07/07/2024",
        "fail_date": "",
        "status": "in progress",
        "title": "Revise 4 cards by 07/07/2024",
        "type": "Card"
    },
    "goalID-2": {
        "data": {
            "goal_xp": "60",
            "start_date": "03/07/2024",
            "starting_xp": "0"
        },
        "end_date": "30/07/2024",
        "fail_date": "",
        "status": "in progress",
        "title": "Gain 60 XP by 30/07/2024",
        "type": "XP"
    }
}

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| goalID               | A 77-digit unique identifier or key associated with each goal.                    | Object  | 
| data                 | An object containing goal-specific metrics, such as `goal_xp`, `start_date`, and `starting_xp` for XP goals or `cards_to_revise` and `cards_revised_so_far` for card goals. | Object  | 
| cards_revised_so_far | Associated with card goals, this indicates the number of cards revised so far.    | String  | 
| cards_to_revise      | Associated with card goals, this specifies the total number of cards to be revised.| String  | 
| goal_xp              | Associated with XP goals, this specifies the target amount of experience points (XP) the user aims to achieve.| Object  | 
| start_date           | Associated with XP goals, this indicates the date when the XP goal began.              | String  | 
| starting_xp          | Associated with XP goals, this indicates the initial amount of experience points (XP) at the beginning of the goal. | String  | 
| end_date             | The date by which the current goal must end, in `dd/mm/yyyy` format.              | String  | 
| fail_date            | The date on which the goal's status changed to 'failed'. This field is only populated if the goal fails; otherwise, it is an empty string. | String  | 
| status               | The current status of a goal, which can be either `completed`, `in progress`, or `failed`. | String  | 
| title                | The name assigned to the goal.                                                    | String  | 
| type                 | The nature of a goal. Goals can either be of type `Card` or `XP`.                 | String  | 


**Error Response**
HTTP Status: 400
A bad request error. Returned when the request body parameter is not in the expected JSON format.


```
{
    "error": Your supplied json keys do not match the expected format. The request should be in the format: {'userID': ''} 
}

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error and provides a possible solution.               | string  | 




<br></br>
******************************************

## Edit Card Goal
### **Endpoint:** /edit-card-goal
### **Method:** POST
Edit an existing card goal for the user.

### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | Identifies the user who is editing their card goal.                                       | String  | Required          |
| goalID       | A 77-digit unique identifier or key associated with the card goal being edited.           | String  | Required          |
| newEndDate   | The new end date for the card goal, in `dd/mm/yyyy` format.                               | string  | Required          |
| newTitle     | The new title assigned to the card goal.                                                  | String  | Required          |
| newCardsToRevise | Specifies the updated number of cards the user intends to revise for this goal.       | string  | Required          |




## Request Example

```
    Curl -X POST -H "Content-Type: application/json” -d {"userID": "user1", "goalID": "11110748168480479028433924465493243860761911102946223297681236368808083322222", "newEndDate": "30/07/2024", "newTitle": "Updated Goal", "newCardsToRevise": "4" } http://dolphinflashcards.com/api/edit-card-goal

```


## Response Example

**Success Response**<br>
HTTP Status: 200 **
```
    {
        "success": "Goal updated successfully"
    }

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| success              | Provides additional information confirming that the request was successful.       | String  | 



**Error Responses**<br>
Returns an error when supplied with an invalid goal or user ID.

HTTP Status: 400
A bad request error. Returned when the request body parameters are not in the expected JSON format.


```
{
    "error": "Your supplied json keys do not match the expected format. The request should be in the format: {'userID': '', 'goalID': '', 'newEndDate': '', 'newTitle': '', 'newCardsToRevise': ''}"
}

```

**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error and provides a possible solution.               | string  | 



HTTP Status: 500

```
{
    "error": "Goal not found"
}

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error.                                                | string  | 





<br></br>
**********************************

## Edit XP Goal
### **Endpoint:** /edit-xp-goal
### **Method:** POST
Edit an existing experience points (XP) goal for the user. 

### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | Identifies the user who is editing their XP goal.                                         | String  | Required          |
| goalID       | A 77-digit unique identifier or key associated with the XP goal being edited.           | String  | Required          |
| newEndDate   | The new end date for the XP goal, formatted as `dd/mm/yyyy`.                              | String  | Required          |
| newTitle     | The new title assigned to the XP goal.                                                     | String  | Required          |
| newGoalXP    | The new desired amount of experience points (XP) the user intends to achieve with this goal.| String  | Required        |




## Request Example

```
    Curl -X POST -H "Content-Type: application/json” -d {"userID": "user1", "goalID": "55335192866017507647804408894345572659406282731228567391554804537877046919111", "newEndDate": "08/08/2024", "newTitle": "Updated Title for XP Goal", "newGoalXP": "80" } http://dolphinflashcards.com/api/edit-xp-goal

```


## Response Example

**Success Response**<br>
HTTP Status: 200 
```
    {
        "success": "Goal updated successfully"
    }

```

**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| success              | Provides additional information confirming that the request was successful.       | String  | 



**Error Responses**<br>
HTTP Status: 400
A bad request error. Returned when the request body parameters are not in the expected JSON format.


```
{
    "error": "Your supplied json keys do not match the expected format. The request should be in the format: {'userID': '', 'goalID': '', 'newEndDate': '', 'newTitle': '', 'newGoalXP': ''}"
}

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error and provides a possible solution.               | string  | 




HTTP Status: 500
```
{
    "error": "Goal not found"
}

```

**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error.                                                | string  | 






<br></br>
**********************************

## Delete Goal
### **Endpoint:** /delete-goal
### **Method:** DELETE
Delete a user's goal.

### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | Identifies the user deleting a goal.                                                      | String  | Required          |
| goalID       | A 77-digit unique identifier or key associated with the goal being deleted.               | String  | Required          |





## Request Example

```
    Curl -X DELETE -H "Content-Type: application/json” -d {"userID": "user1", "goalID": "55335192866017507647804408894345572659406282731228567391554804537877046919111"} http://dolphinflashcards.com/api/delete-goal

```


## Response Example

**Success Response**<br>
HTTP Status: 200
```
    {
        "success": "Goal deleted successfully"
    }

```

**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| success              | Provides additional information confirming that the request was successful.       | String  | 



**Error Response**<br>
HTTP Status: 400
A bad request error. Returned when the request body parameters are not in the expected JSON format.

```
{
    "error": "Your supplied json keys do not match the expected format. The request should be in the format: {'userID': '', 'goalID': ''}"
}

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error and provides a possible solution.               | string  | 