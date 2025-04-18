#  1. <a name='Overview'></a>Overview

Welcome to this guide! Read more to learn how to contribute. For quick reference, the app uses `Python`, `Flask`, `React` and `Google Firebase`

> :warning: **This is no longer up to date**! See the latest guide [here](https://docs.dolphinflashcards.com/conceptual-docs/quickstart)

<!-- vscode-markdown-toc -->
* 1. [Contributing to the Frontend Web App](#ContributingtotheFrontendWebApp)
	* 1.1. [Quick Explanation](#QuickExplanation)
	* 1.2. [ Initial setting up](#Initialsettingup)
	* 1.3. [Running the React Frontend App](#RunningtheReactFrontendApp)
* 2. [Contributing to the Backend API](#ContributingtotheBackendAPI)
	* 2.1. [Quick Explanation](#QuickExplanation-1)
	* 2.2. [Using a Local Setup (Recommended)](#UsingaLocalSetupRecommended)
	* 2.3. [Using Firebase as the database](#UsingFirebaseasthedatabase)
	* 2.4. [Serving the frontend](#Servingthefrontend)
* 3. [Developing Documentation](#DevelopingDocumentation)
* 4. [Some Extra Information...](#SomeExtraInformation...)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

The project uses feature branches, which are made from the development branch

<details>

<summary>Learn how the code works</summary>

The backend, located in the `backend/` directory, is a Python Flask project that serves as the API for the app, accessible at `/api/`. The frontend, situated in the `frontend/` directory, is a React project responsible for the user interface of the website. It interacts with the backend API to fetch and store data.

When code is merged to main, the code in the React project is built into static files using `npm run build`. The flask server in the `backend/` folder
then serves this code, located in `frontend/build/`, at the route `/`, while serving the backend API routes at `/api`. All the code for the backend routes
is stored in `backend/routes/api/`

So the fontend and backend are independent of each other. The frontend can be run without worrying about the backend, and vice versa. In production, they are coupled more tightly together
</details>

##  1. <a name='ContributingtotheFrontendWebApp'></a>Contributing to the Frontend Web App

###  1.1. <a name='QuickExplanation'></a>Quick Explanation

The frontend, stored in the `frontend` folder is a React app. Therefore, you need to install everything you normally would for a React project, including `npm`.
The frontend will always communicate with the deployed api server `http://dolphinflashcards.com/api`. You can change this URL in frontend/src/api/config.js if needed, but remember to revert it before making a pull request (the file should be in the gitignore).

###  1.2. <a name='Initialsettingup'></a> Initial setting up
Here's what you need to do before beginning development on Dolphin:
* Fork the main repository at `https://github.com/jacob-macleod/Dolphin-Flashcard-App`
* Clone the fork (with `git clone [...]`)
* `cd Dolphin-Flashcard-App`
* `cd frontend`

###  1.3. <a name='RunningtheReactFrontendApp'></a>Running the React Frontend App

Enter the following commands:

* `npm install` which will install everything in `frontend/package.json`
* `npm serve`

The React app will be accessible at `http://localhost:3000`.

The React app is built into static files when running in production. More information on this is below. in the `Serving the frontend` section

##  2. <a name='ContributingtotheBackendAPI'></a>Contributing to the Backend API

###  2.1. <a name='QuickExplanation-1'></a>Quick Explanation

The backend, consists of an API, which is being documented in `docs/`. The API is made up of of functions to handle storing and reading data
in different ways. For example, the route to update the streak reads the current streak being looked at, caculates the new streak, and saves it to the database.

In production, Google Firebase is used as a database, and in development, either the production firebase instance, a dev instance, or local json files can be used.
To determine whether Firebase or local json files are used, `backend/database/database_config.py` is looked at.

* If `type="production"`, the production Firebase server is used

* If `type="local"`, a local firebase server is used

Depending on the value of the `type` variable, either the `FirebaseDatabase` or `LocalDatabase` classes are initialised, and the initialised instance is stored
by the `Database` class as `db`. `FirebaseDatabase` and `LocalDatabase` inherit from the `DatabaseAbstract` abstract class, and so must have a `get`, `save` and
`increment` method. For either class, these are used in the same way.

Note that API documentation is in `docs/`

###  2.2. <a name='UsingaLocalSetupRecommended'></a>Using a Local Setup (Recommended)

To contribute to the backend, using local a local Firebase setup, follow these steps:

* Clone the repository and `cd` into it

* Run `pip install -r requirements.txt`

* Make sure `backend/database/database_config.py` stores `type="local"`

* Run `bash firebase_emulator.sh` - this runs a local firebase docker image for development
  * `firebase_emulator.sh` is currently only avaliable for Linux, but since it only uses docker and a `curl` command, it should be fairly easy to port to Windows
  * `docker` and `curl` are required to run the emulator

* Run `python3 backend/main.py`

Then, you can go to different API routes - go to `<the url flask prints when you run the code>/api/<the API route>`

###  2.3. <a name='UsingFirebaseasthedatabase'></a>Using Firebase as the database

Follow these steps:

* Clone the repository and `cd` into it

* Run `pip install -r requirements.txt`

* Make sure `backend/database/database_config.py` stores `type="production"`

* Create a new firebase project. You can use [this guide](https://firebase.google.com/docs/database/admin/start#python_1) to help

* Create the following files in the root repository of the project:
  * `firebase_url` - stores the URL of the firebase instance
  * `firebase_config.json` - stores the Firebase config - a json file containing apiKey, authDomain, etc
  * `credentials.json` - the service account credentials, for interacting with the database

* These files are added automatically when the code is built for the server

* Run `python3 backend/main.py`

###  2.4. <a name='Servingthefrontend'></a>Serving the frontend

Whichever method you use, you can develop the frontend independently of the backend by referring to the relevant section. Or, you can run them together, like in production. To do this, enter the following commands:

* `cd frontend`
* `npm install` which will install everything in `frontend/package.json`
* `npm run build`

This will build the React app to `frontend/build`. Then, the server will serve the static files in that folder. Therefore, the backend server must be running first.

##  3. <a name='DevelopingDocumentation'></a>Developing Documentation

The documentation for Dolphin Flashcards is stored in `.mdx` files. While you can read them in their raw versions, it is much easier to use the deployed documentation website at https://docs.dolphinflashcards.com.

When making changes to the documentation locally, you can run these commands to run a local website storing the documentation:

- `npm -i -g mintlify`
- `cd docs`
- `mintlify dev --port 3333`

A new window will open in your browser showing the documentation

##  4. <a name='SomeExtraInformation...'></a>Some Extra Information...

When contributing, follow these general guidelines:

* Do your work in a branch from the development branch, then create a pull request when you're ready
  * In your pull requests, prefix the title with `PATCH:`, `MAJOR:`, or `MINOR:`
  * Update the version in `backend/__init__.py`:
    * If you're making a patch, increment the right hand side number by one
    * If you're making a minor change, increment the middle number by one
    * If you're making a major change, increment the left hand side number by one
  * This follows the [semantic versioning standard](https://semver.org)
  * Write about the changes you've made in `CHANGELOG.md`, following the standard there
* Add comments in issues to show what you're working on
* Try to follow the coding style and conventions established in the project
* Try to write unit tests, if you can - this may depend on what, in particular, you're coding. The backend tests are in `testing/`
* Have fun!
* Finally, if you have any questions or problems running the code, please ask me in an issue, or create a new one!
