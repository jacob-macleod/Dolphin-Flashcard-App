## Calculate Card Stats
### **Endpoint:** /calculate-card-stats
### **Method:** POST
Calculate card statistics when a user is revising a set of cards. For each card, it calculates the next card to look at and the new card’s review times and statuses.

### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | The user whose card statistics are being calculated                                       | String  | Required          |
| cardStatus   | The state of the card. Possible values are "right", "wrong", or "easy."                   | String  | Required          |
| cardStreak   | Number of cards in the set that have been examined in a session before a mistake is made. | String  | Required          |
| currentIndex | Index of the current card being looked at                                                 | String  | Required          |
| lastReview   | Date of the last review                                                                   | String  | Required          |
| maxIndex     | The maximum number of cards in the set                                                    | String  | Required          |
| reviewStatus | Indicates the review status of the card                                                   | String  | Required          |


## Request Example

```
    Curl  -X POST  -H "Content-Type: application/json” -d {"userID": "my-id", "cardStatus": "right", "cardStreak": "3", "currentIndex": "4", "lastReview": "09/01/2024", "maxIndex": "20", "reviewStatus": "8.0"} http://dolphinflashcards.com/api/calculate-card-stats

```

## Response Example

**Success Response**<br>
HTTP Status: 200
```
    {
        "currentIndex": "3",
        "maxIndex": "25",
        "cardStatus": "right",
        "lastReview": "01/01/2024",
        "reviewStatus": "8.0",
        "cardStreak": "5"
    }

```

**Error Response**<br>
HTTP Status: 400
```
{
    "error": Your supplied json keys do not match the expected format. The request should be in the format:  {'userID': 'my-id', 'cardStatus': 'integer', 'cardStreak': 'integer', 'currentIndex': 'integer', 'lastReview': 'string', 'maxIndex': 'integer', 'reviewStatus': 'float'} 
}

```


*********************************


## Update Heat map
### **Endpoint:** /update-heatmap
### **Method:** POST
Update the user's heatmap data when their streak is modified.


### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | Identifies the user whose heatmap data is to be updated                                   | String  | Required          |



## Request Example

```
    Curl  -X POST  -H "Content-Type: application/json” -d { "user1": "123"} http://dolphinflashcards.com/api/calculate-card-stats

```

## Response Example

**Success Response**<br>
HTTP Status: 200
```
{
    "2030-01-01": "8",
    "2030-01-02": "1",
    "2030-01-03": "5",
    "2030-01-04": "15"
}


```

**Error Response**<br>
HTTP Status: 400
```
{
    "error": Your supplied json keys do not match the expected format. The request     should be in the format: {'userID': ' '}
}

```

**********************************

## Get Heatmap
### **Endpoint:** /get-heatmap
### **Method:** POST
Retrieve the user's heatmap data.


### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | Identifies the user whose heatmap data is to be retrieved.                               | String  | Required          |



## Request Example

```
    Curl  -X POST  -H "Content-Type: application/json” -d { "user1": "123"} http://dolphinflashcards.com/api/get-heatmap

```

## Response Example

**Success Response**<br>
HTTP Status: 200
```
{
   "2030-01-01": "1",
    "2030-01-02": "2",
    "2030-01-03": "3",
    "2030-01-04": "6",
}

```

**Error Response**<br>
HTTP Status: 400
```
{
    "error": Your supplied json keys do not match the expected format. The request     should be in the format: {'userID': ' '}
}


```

**********************************

## Calculate Streak
### **Endpoint:** /calculate-streak
### **Method:** POST
Calculate the user's streak, and increase it if needed.


### Parameters

#### **Query String Parameter**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| increase       | Can be added to the streak to increase it, if needed                                    | String  | Required          |



#### **Request Body Parameter**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | Identifies the user whose streak is to be calculated                                      | String  | Required          |



## Request Example

```
    Curl  -X POST  -H "Content-Type: application/json” -d { "user1": "123"} http://dolphinflashcards.com/api/calculate-streak?increase=true

```

## Response Example

**Success Response**<br>
HTTP Status: 200
```
{
    "success": true
}

```

**Error Response**<br>
HTTP Status: 400
```
{
    "error": Your supplied json keys do not match the expected format. The request     should be in the format: {'userID': ' '}
}

```
