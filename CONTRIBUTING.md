# How to Contribute

## Overview

This project consists of essentially two different codebases. `backend/` is a Python Flask project which contains
the API for interacting with the app, server at `/api/`. `frontend` is a React project used to store the fronend for the website. This frontend
interacts with the database through the API, and is served at `/`

When code is merged to main, the code in the React project is built into static files using `npm run build`. The flask server in the `backend/` folder
then serves this code, located in `frontend/build/`, at the route `/`, while serving the backend API routes at `/api`. All the code for the backend routes
is stored in `backend/routes/api/`

This all is to say that the frontend and the backend of the site are entirely decoupled. Work on the frontend can be performed independently
of the backend, and work on the backend can be done independently of the frontend.

## Contributing to the Backend API

The backend, consists of an API, which is being documented in `docs/`. The API basically consists of functions to handle storage and retrieval of data
in different ways. For example, the route to update the streak requires the current streak being looked at, caculates the new streak, and saves it to the database.

In production, Google Firebase is used as a database, and in development, either the production firebase instance, a dev instance, or local json files can be used.
To determine whether Firebase or local json files are used, `backend/database/database_config.py` is looked at.

* If `type="production"`, the production Firebase server is used

* If `type="local"`, local files are used

Depending on the value of the `type` variable, either the `FirebaseDatabase` or `LocalDatabase` classes are initialised, and the initialised instance is stored
by the `Database` class as `db`. `FirebaseDatabase` and `LocalDatabase` inherit from the `DatabaseAbstract` abstract class, and so must have a `get`, `save` and
`increment` method. For either class, these are used in the same way.
