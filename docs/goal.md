## Create XP Goal
### **Endpoint:** /create-xp-goal
### **Method:** POST
Create a new experience points (XP) goal.

### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | An identifier for the user whom the XP goal is being created for.                         | String  | Required          |
| goalXP       | The desired amount of experience points (XP) the user intends to achieve with a particular goal. This is the same as a card goal except for the data section.  | Number  | Required          |
| endDate      | The date in which the user intends to achieve the XP goal.                                | Date (dd/mm/yyyy)  | Required          |




## Request Example

```
    Curl -X POST -H "Content-Type: application/json” -d {"userID": "123", "goalXP": "100", "endDate": "30/01/2022" } http://dolphinflashcards.com/api/create-xp-goal

```


## Response Example

**Success Response**<br>
HTTP Status: 200
```
    {
        "success": "Goal created successfully"
    }

```

**Error Response**<br>
HTTP Status: 400
```
{
    "error": Your supplied json keys do not match the expected format. The request should be in the format:  {'userID': 'string', 'goalXP': 'number', 'endDate': 'sample-date'} 
}

```


****************************************

## Create Card Goal
### **Endpoint:** /create-card-goal
### **Method:** POST
Create a new card goal.

### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | Identifies the user whom a card goal is to be created for.                                | String  | Required          |
| cardsToRevise| The number of cards the user intends to revise for the current goal.                      | Number  | Required          |
| endDate      | The date by which the user intends to revise the cards for this goal.                     | Date (dd/mm/yyyy)  | Required          |




## Request Example

```
    Curl -X POST -H "Content-Type: application/json” -d {"userID": "123", "cardstorevise": "5", "endDate": "30/01/2022" } http://dolphinflashcards.com/api/create-card-goal

```


## Response Example

**Success Response**<br>
HTTP Status: 200 **
```
    {
        "success": "Goal created successfully"
    }

```

**Error Response**<br>
HTTP Status: 400
```
{
    "error": Your supplied json keys do not match the expected format. The request should be in the format:  {'userID': 'string', 'cardsToRevise': 'number', 'endDate': 'sample-date'} 
}

```

****************************************

## Update Goal Status
### **Endpoint:** /update-goal-status
### **Method:** POST
Update the status of a goal. Goals can be of type 'card' or 'XP' and the possible values for the status of a goal are "completed", "in progress", or "failed".
### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | An identifier for the user whose goals' statuses are to be updated.                       | String  | Required          |


## Request Example

```
    Curl -X POST -H "Content-Type: application/json” -d '{"userID": "123"}' http://dolphinflashcards.com/api/update-goal-status

```

## Response Example

**Success Responses**<br>
HTTP Status: 200
```
    "firstGoal": {
        "status": "completed",
        "type": "XP",
        "data": {
            "starting_xp": 50,
            "goal_xp": 100
        }
    }

```

HTTP Status: 200
```
    "goal2": {
        "status": "in progress",
        "type": "Card",
        "data": {
            "cards_revised_so_far": 2,
            "cards_to_revise": 8
        }
    }

```

**Error Response**<br>
HTTP Status: 400
```
{
    "error": Your supplied json keys do not match the expected format. The request should be in the format: {'userID': 'string'} 
}

```




******************************************

## Edit Card Goal
### **Endpoint:** /edit-card-goal
### **Method:** POST
Edit an existing card goal.

### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | Identifies the user whose card goal is being edited.                                      | String  | Required          |
| goalID       | An identifier for the card goal being edited.                                             | String  | Required          |
| newEndDate   | The new end date for the card goal being edited.                                          | Date (dd/mm/yyyy)  | Required          |
| newTitle     | The new title for the card goal being edited.                                             | String  | Required          |
| newCardsToRevise     | The new number of cards to revise for the card goal being edited.                 | Number  | Required          |




## Request Example

```
    Curl -X POST -H "Content-Type: application/json” -d {"userID": "123", "goalID": "goal1", "newEndDate": "30/01/2022", "newTitle": "title1", "newCardsToRevise": "4" } http://dolphinflashcards.com/api/edit-card-goal

```


## Response Example

**Success Response**<br>
HTTP Status: 200 **
```
    {
        "success": "Goal updated successfully"
    }

```

**Error Responses**<br>
HTTP Status: 400
```
{
    "error": Your supplied json keys do not match the expected format. The request should be in the format:  {'userID': 'string', 'goalID': 'string', 'newEndDate': 'sample-date', 'newTitle': 'string', 'newCardsToRevise': 'number'} 
}

```

HTTP Status: 404
```
{
    "error": "Goal not found"
}

```


**********************************

## Edit XP Goal
### **Endpoint:** /edit-xp-goal
### **Method:** POST
Edit an existing experience points (XP) goal.

### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | An identifier for the user who owns the XP goal to be edited.                             | String  | Required          |
| goalID       | An identifier for the XP goal to be edited.                                               | String  | Required          |
| newEndDate   | The new end date for the xp goal being edited.                                            | Date (dd/mm/yyyy)  | Required          |
| newTitle     | The new title for the xp goal being edited.                                               | String  | Required          |
| newGoalXP    | The new desired amount of experience points (XP) for the XP goal being edited.            | Number  | Required          |




## Request Example

```
    Curl -X POST -H "Content-Type: application/json” -d {"userID": "123", "goalID": "goal1", "newEndDate": "30/01/2022", "newTitle": "title1", "newGoalXP": "40" } http://dolphinflashcards.com/api/edit-xp-goal

```


## Response Example

**Success Response**<br>
HTTP Status: 200 
```
    {
        "success": "Goal updated successfully"
    }

```

**Error Responses**<br>
HTTP Status: 400
```
{
    "error": Your supplied json keys do not match the expected format. The request should be in the format:  {'userID': 'string', 'goalID': 'string', 'newEndDate': 'sample-date', 'newTitle': 'string', 'newGoalXP': 'number'} 
}

```


HTTP Status: 404
```
{
    "error": "Goal not found"
}

```


**********************************

## Delete Goal
### **Endpoint:** /delete-goal
### **Method:** DELETE
Delete an existing goal for a user.

### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | An identifier for the user who owns the goal to be deleted.                               | String  | Required          |
| goalID       | The identifier for the goal to be deleted.                                                | String  | Required          |





## Request Example

```
    Curl -X DELETE -d {"userID": "123", "goalID": "goal1"} http://dolphinflashcards.com/api/delete-goal

```


## Response Example

**Success Response**<br>
HTTP Status: 200
```
    {
        "success": "Goal deleted successfully"
    }

```

**Error Response**<br>
HTTP Status: 400
```
{
    "error": Your supplied json keys do not match the expected format. The request should be in the format:  {'userID': 'string', 'goalID': 'string'} 
}

```

HTTP Status: 404
```
{
    "error": "Goal not found"
}

```