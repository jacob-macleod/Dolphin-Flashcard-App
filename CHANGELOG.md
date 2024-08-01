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

## 3.5.1 - 2024-08-01

### Fixed

- /delete-goal now gives an error message if the goal does not exist

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
- Added a basic edit-flashcard page  with most features and API calls unimplemented which the `CreateFlashcardSetDialogue` modal takes the user to when a flashcard is created. The page can be passed `newSet`, which if true, won't request flashcard data from the server. When implementing the edit-flashcard page fully, the page should use the API to read flashcard details when `newSet` is not true
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
