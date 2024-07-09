## Update Heat map 
### **Endpoint:** /update-heatmap
### **Method:** POST
 Called when streak is updated. Streak is the number of cards that have been looked at in the set this session before getting one wrong.


### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | Identifies the user with an updated heatmap data.                                        | String  | Required          |



## Request Example

```
    Curl  -X POST  -H "Content-Type: application/json” -d { "userID": "user1"} http://dolphinflashcards.com/api/update-heatmap
```

## Response Example

**Success Response**<br>
HTTP Status: 200

Returns:
```
{
    "error": "User does not exist!"
}
```


Instead of:
```
{
    "2030-01-01": "8",
    "2030-01-02": "1",
    "2030-01-03": "5",
    "2030-01-04": "15"
}
```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
|                 |                |   | 





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



HTTP Status: 500
```
{
    "error": "User does not exist!"
}

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Provides details about the nature of the error.                                   | string  | 





<br></br>
**********************************

## Get Heatmap
### **Endpoint:** /get-heatmap
### **Method:** POST
Retrieve the user's heatmap data.


### Parameters

#### **Request Body Parameters**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | Identifies the owner of the heatmap data.                                                 | String  | Required          |



## Request Example

```
    Curl  -X POST  -H "Content-Type: application/json” -d { "userID": "user1"} http://dolphinflashcards.com/api/get-heatmap

```

## Response Example

**Success Response**<br>
HTTP Status: 200

Returns:
```
{
    "error": "User does not exist!"
}
```


Instead of:
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





HTTP Status: 500

```
{
    "error": "User does not exist!"
}
```

**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Provides details about the nature of the error.                                   | string  | 





**********************************

## Calculate Streak
### **Endpoint:** /calculate-streak
### **Method:** POST
Calculate the user's streak, and increase it if necessary. Streak is the number of cards that have been looked at in the set this session before getting one wrong.


### Parameters

#### **Query String Parameter**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| increase     | Can be added to the query string to increase a user's streak. If needed, set `increase = true` | Boolean  | Optional       |



#### **Request Body Parameter**

| Parameter    | Description                                                                               | Type    | Required/Optional |
|--------------|-------------------------------------------------------------------------------------------|---------|-------------------|
| userID       | Identifies the owner of the streak.                                                       | String  | Required          |



## Request Example

```
    Curl  -X POST  -H "Content-Type: application/json” -d { "userID": "user1"} http://dolphinflashcards.com/api/calculate-streak?increase=true

```

## Response Example

**Success Response**<br>
HTTP Status: 200

Returns:

```
{
    "error": "'NoneType' object is not subscriptable"
}
```


Instead of:
```
{
    "success": true
}

```




**Error Response**<br>
HTTP Status: 400
```
{
    "error": Your supplied json keys do not match the expected format. The request should be in the format: {'userID': ' '}
}

```
**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error and provides a possible solution.               | string  | 


HTTP Status: 500
A bad request error. Returned when the request body parameter is not in the expected JSON format.

```
{
    "error": "'NoneType' object is not subscriptable"
}

```

**Response Body**
| Parameter            | Description                                                                       | Type    | 
|----------------------|-----------------------------------------------------------------------------------|---------|
| error                | Describes the nature of the error and provides a possible reason.               | string  | 
