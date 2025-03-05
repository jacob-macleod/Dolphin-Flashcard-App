# Overview

This changelog follows the semantic versioning standard(https://semver.org)

<!--
## 0.0.0 - yyyy-mm-dd

### Added

- N/A

### Fixed

- N/A

### Changed

- N/A

### Removed

- N/A
-->

## 6.7.0 - 2025-03-03

### Added

- Added new API route `/api/import-from-quizlet` to import flashcard sets directly from Quizlet URLs. Added tests for this route as well `test_quizlet_import.py`.
- Added testing script for windows as a powershell script run_tests.ps1 and firebase_emulator.ps1.

## 6.6.0 - 2025-03-2

### Added

- Search within flashcard set

## 6.5.0 - 2025-03-01

### Added

-Fullscreen Mode for flashcards

## 6.4.2 - 2025-03-1

### Fixed

- Choose a folder dialogue: add placeholder text and increase height of description

## 6.4.1 - 2025-02-28

### Fixed

- Fix padding above boxes on dashboard page

## 6.4.0 - 2025-02-26

### Added

- Developed CLI Tools for Managing Backend, Frontend, Database, Tests and Configurations.

## 6.3.2 - 2025-02-27

### Fixed

- Fixed error in unit tests due to changes in functionality in 6.3.1

## 6.3.1 - 2025-02-27

### Fixed

- Fixed goal deletion functionality to properly handle non-existent goals by checking if the document exists before attempting to delete it

## 6.3.0 - 2025-02-24

### Added

- Implement a feature to import flashcards directly from CSV files.

## 6.2.3 - 2025-02-23

### Fixed

-Loading animations for preview flashcard and all cards mode

## 6.2.6 - 2025-02-20

### Fixed

- Fixed issue where updating flashcards would reset all review progress
- Fixed handling of review status preservation for existing cards

## 6.1.6 - 2025-02-15

### Changed

- Updated documentation and added latest videos

## 6.1.5 - 2025-02-14

### Added

- Added spacing between the label (`Paragraph`) and input fields using `marginRight`.
- Introduced `marginBottom` to create spacing between the two input containers.
- Added Placeholder text in both input containers.

### Fixed

- Ensured both input fields have equal width and alignment.
- Adjusted label spacing to maintain a consistent layout.

### Changed

- Updated the input container layout for better readability and structure.
- Changed the new flashcard title from 'Choose a folder' to 'Choose a location'.

## 6.1.4 - 2025-02-13

### Fixed
- Completed the FAQ section of the landing page

## 6.1.3 - 2025-02-12 

### Changed

- Made user's name right aligned in left menu

## 6.1.2 - 2025-02-11  

### Added  

- Created a Tutorials section in the documentation.  
- Added Frontend page.  
- Added Backend** page.  
- Added Unit Tests page.  
- Added Introduction page to help contributors navigate the tutorials.  

## 6.1.1 - 2025-01-31

### Fixed

- Fixed sign in errors on new landing page.
- Fixed responsive design in the landing page (by adding the useEffect that listens to screen width changes)
- Fixed dimensions and object fit issues with the landing page coffee/table image

### Changed

- Extracted sign in button + related functionality to separate SignInButton component
- The email address in the landing page footer section is now constructed programatically to stop web crawlers from spamming the email (good practice)
- When the email displayed in the landing page footer is clicked, your emails open
- Sign in button component now uses flex-box and the contents are justified as "flex-start"

## 6.1.0 - 2025-01-28

### Added

- Added a DevSection component as a new version for the Open Source component on the landing page (previous DeveloperSection still exists as it is used by SignIn page)
- Added a LandingPageFooter component used at the bottom of the landing page
- Added a Logos folder (componments/Logos) that contains a DolphinLogo and a DolphinTitleLogo to reduce repeated code
- Added ProjectProgress component (hidden on mobile)

### Fixed

- Display the 404 PageNotFound page for error URL routes, EVEN IF the user is not signed in (PageNotFound design might need rework?)

### Changed

- Updated landing page to match new figma design
- If the user has no JWT, display the LandingPage instead of the old landing page located in the SignIn component
- Modified GridContainer component so it accepts optional styles
- Modified Image component so it accepts optional styles
- Extracted the Mailchimp Input component into a separate file/component so mailchimp input can be reused without using the widget
- Redirect user to LandingPage instead of SignIn page, if they are not signed in, on the MainPage component

### Removed

- Removed all 4 margins from .input class

## 6.0.0 - 2025-01-03

### Added

- Added community page
- Users can now save flashcards made by others, and edit their local versions
- Added new API routes to handle the above

### Changed

- BREAKING: `/api/get-user` has now been renamed `/api/get-user-from-jwt`
- BREAKING: New route `/api/get-user` has now been added, which fetches user data from just the user ID (and no JWT token)

## 5.5.0 - 2024-10-26

### Changed

- Refactored Backend Tests
- Tests work separately

## 5.4.0 - 2024-09-19

### Added

- Added abilty to search for flashcards

### Changed

- Improved documentation

## 5.3.0 - 2024-09-12

### Added

- Added mintlify documentation

### Removed

- Removed deprecated endpoint, /api/calculate-card-stats, from the documentation

## 5.2.3 - 2024-09-13

### Fixed

- Fixed issue in the card review algorithm

## 5.2.2 - 2024-09-12

### Changed

- Released the Alpha

## 5.2.1 - 2024-09-06

### Changed

- Adjusted CONTRIBUTING.md to give more detail

## 5.2.0 - 2024-09-05

### Added

- Solve bug in server and added sign-in method

## 5.1.0 - 2024-09-01

### Fixed

- Fixed bug where JWT_PRIVATE_KEY was not successfully stored in docker

### Changed

- Rewrote spaced repetition algorithm to improve it and make it more flexible

## 5.0.0 - 2024-08-17

### Added

- New backend methods and frontend components to allow folders to be renamed and deleted
- Added new 404 error page
- Added new ErrorBoundary component to show when there is a Frontend React error
- Added checking to see if the user is signed in for all pages
- Added ability to sign out
- Added ability to delete flashcards
- BREAKING: Changed get-flashcards so it reads flashcard data from your own flashcard data list. It now needs the user ID in the API request
- Made disabled buttons unclickable
- A valid access link is required to sign in to the frontend

### Fixed

- Issue where the XP, streak and heatmap were not updated when a user revised cards

### Changed

- BREAKING: jwtToken (the json web token provided by create-account) is now passed instead of userID to all functions, allowing for greater security

## 4.2.0 - 2024-08-16

### Added

- Flashcards can now be renamed - this includes a new backend API route and a new front end component

## 4.1.0 - 2024-08-13

### Added

- Flashcards can be deleted - this includes new frontend code and a new backend component
- Also test_update_goal_status is commented out for now - the unit tests keep failing due to minor changes in generated output. I need to work out how to solve this

## 4.0.0 - 2024-08-11

### Added

- The study button next to the folder now allows you to study all cards in the folder

### Changed

- This is version `4.0.0` because 3.5.0 included breaking API changes, so the version should have been MAJOR

## 3.5.1 - 2024-08-01

### Fixed

- /delete-goal now gives an error message if the goal does not exist

## 3.5.0 - 2024-07-31

### Added

- Added a new view flashcards page

## 3.4.0 - 2024-06-15

### Changed

- Turned the edit flashcard popup into a WYSIWYG editor

### Fixed

- Fixed some issues in pipelines

## 3.3.0 - 2024-06-15

### Added

- Implemented edit flashcard page and created components for rendering flashcards

### Fixed

- Fixed unit tests

## 3.2.0 - 2024-06-11

### Added

- Added ability to create a folder
- Added new API endpoint to create folder
- Added unit tests for `create-folder` endpoint

## 3.1.0 - 2024-06-10

### Added

- New `CreateFlashcardSetDialogue` modal to handle creating a flashcard set
- Added a basic edit-flashcard page with most features and API calls unimplemented which the `CreateFlashcardSetDialogue` modal takes the user to when a flashcard is created. The page can be passed `newSet`, which if true, won't request flashcard data from the server. When implementing the edit-flashcard page fully, the page should use the API to read flashcard details when `newSet` is not true
- Added basic `CreateFolderDialogue` modal, which does not work yet

### Changed

- Updated `CONTRIBUTING.md` to reflect the latest database changes

## 3.0.1 - 2024-06-07

### Added

- Improved documentation for goals.py

## 3.0.0 - 2024-06-05

### Added

- Seperated concrete database implementation classes from api methods to seperate classes in `database/handlers`
- Added much more unit tests, and made the pipeline run all unit tests
- Added methods to help with unit tests like /api/get-user-stats

### Changed

- Switched to Firebase Firestore instead of Firebase Database to allow referencing data, not just embedding - leading to greater scaliability
- Changed frontend to interact with the new database

### Removed

- Deprecated /api/calculate-card-stats - this will now be done by the client to improve speed
- Deprecated /api/get-weekly-xp and /api/get-total-xp - the frontend calculates them at the same time, so it makes sense to use /api/get-user-stats to pull this data instead

## 2.3.1 - 2024-04-17

### Added

- Added NewGoalForm file

### Changed

- Refactored NewGoalPopup in frontend

## 2.3.0 - 2024-04-12

### Changed

- Refactored code by adding more folders to more easily manage componments
- Removed unneeded files

## 2.2.2 - 2024-04-11

### Fixed

- Fixed workflow bug which meant environment variable was not read properly

## 2.2.1 - 2024-11-04

### Fixed

- Solved an issue where jsonp was not downloaded

## 2.2.0 - 2024-04-07

### Added

- `Mailchimp` and `MailChimpWidget` to allow signing into the mailchimp newsletter
- The new untracked file `frontend/src/api/secretKeys.js` stores the `action` part of the mailchimp form, including a secret API key. This must be supplied to use mailchimp, otherwise an error will be shown in the console
- The `mailChimpApiKey` key stored in `frontend/src/api/secretKeys.js` can be easily regenerated from mailchimp if forgotten
- Added workflow stage to check config files are corrrect

### Changed

- Added an untested workflow command to store the `MAILCHIMP_API_KEY` variable into the file `frontend/src/api/secretKeys.js` on docker image build

## 2.1.0 - 2024-04-06

### Added

- Added animations throughout site

### Changed

- Made the flashcards page render better on mobile
- Changed modal overlays to better render on mobile

## 2.0.0 - 2024-03-29

### Added

- Added flashcards page
- Added backend method to move a flashcard set to a different folder

### Changed

- The create-flashcard endpoint now must also be passed `folder`, which allows flashcards to be placed in folders. (Set to `""` if the fashcard has no parent folders). This is a breaking change

## 1.4.0 - 2024-03-29

### Added

- Added get_weekly_xp and get_total_xp methods to API

### Changed

- Added proper responsiveness for mobile and tablet devices on dashboard page

## 1.3.1 - 2024-03-28

### Changed

- Edited README.md

### Removed

- N/A

## 1.3.0 - 2024-03-28

### Added

- Added workflow files to allow better handling of tagging and versions

### Changed

- Edited bump_version.sh to give recomendations on whether software is versioned correctly, rather than actually changing it
