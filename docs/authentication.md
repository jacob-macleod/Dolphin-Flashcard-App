# API Reference
By @rajesh-aravind

## Resource

/create account

### Introduction

This API creates an account for a user if one is not created.

### Method

POST

### Base URL

<https://www.dolphinflashcards.com/api>

### Endpoint

/create-account

### Table of Parameters

| Parameter   | Required/Optional | Data Type | Description               |
|-------------|-------------------|-----------|---------------------------|
| userID      | Required          | string    | Unique ID of the user     |
| displayName | Required          | string    | Required Name of the user |

### Example Request

```json
{
  "userID": "uniqueUserID",
  "displayName": "User Name"
}
```

### Example Response
```json
{
  "success": true
}
```

### Return Status Codes

| Status Code | Description                             |
|-------------|-----------------------------------------|
| 200         | OK -- The request has succeeded         |
| 403         | Abort -- Request not from local traffic |
| 404         | Credential file not found               |
