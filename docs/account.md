## Create Account
### **Endpoint:** /create-account
### **Method:** POST
Create a new user account.


### Parameters


#### **Request Body Parameters**
| Parameter            | Description                                                                       | Type    | Required/Optional |
|----------------------|-----------------------------------------------------------------------------------|---------|-------------------|
| userID               | A unique identifier to be assigned to the new user.                               | String  | Required          |
| displayName          | A unique name or title for the new user.                                          | String  | Required          |


## Request Example
```
    Curl -X POST -H "Content-Type: application/json” -d {"userID": "user1", "displayName": "sampleName"} http://dolphinflashcards.com/api/create-account

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

HTTP status code indicating a successful operation.

Indicates that a new user account was created successfully.


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
