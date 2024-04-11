# Overview

This changelog follows the [semantic versioning standard](https://semver.org)

<!--
## [0.0.0] - yyyy-mm-dd

### Added

- N/A

### Fixed

- N/A

### Changed

- N/A

### Removed

- N/A
-->

## [2.2.2] - 2024-04-11

### Added

- N/A

### Fixed

- Fixed workflow bug which meant environment variable was not read properly

### Changed

- N/A

### Removed

- N/A

## [2.2.1] - 2024-11-04

### Added

- N/A

### Fixed

- Solved an issue where jsonp was not downloaded

### Changed

- N/A

### Removed

- N/A

## [2.2.0] - 2024-04-07

### Added

- `Mailchimp` and `MailChimpWidget` to allow signing into the mailchimp newsletter
- The new untracked file `frontend/src/api/secretKeys.js` stores the `action` part of the mailchimp form, including a secret API key. This must be supplied to use mailchimp, otherwise an error will be shown in the console
- The `mailChimpApiKey` key stored in `frontend/src/api/secretKeys.js` can be easily regenerated from mailchimp if forgotten
- Added workflow stage to check config files are corrrect

### Fixed

- N/A

### Changed

- Added an untested workflow command to store the `MAILCHIMP_API_KEY` variable into the file `frontend/src/api/secretKeys.js` on docker image build

### Removed

- N/A

## [2.1.0] - 2024-04-06

### Added

- Added animations throughout site

### Fixed

- N/A

### Changed

- Made the flashcards page render better on mobile
- Changed modal overlays to better render on mobile

### Removed

- N/A

## [2.0.0] - 2024-03-29

### Added

- Added flashcards page
- Added backend method to move a flashcard set to a different folder

### Fixed

- N/A

### Changed

- The create-flashcard endpoint now must also be passed `folder`, which allows flashcards to be placed in folders. (Set to `""` if the fashcard has no parent folders). This is a breaking change

### Removed

- N/A

## [1.4.0] - 2024-03-29

### Added

- Added get_weekly_xp and get_total_xp methods to API

### Fixed

- N/A

### Changed

- Added proper responsiveness for mobile and tablet devices on dashboard page

### Removed

- N/A

## [1.3.1] - 2024-03-28

### Added

- N/A

### Fixed

- N/A

### Changed

- Edited README.md

### Removed

- N/A

## [1.3.0] - 2024-03-28

### Added

- Added workflow files to allow better handling of tagging and versions

### Fixed

- N/A

### Changed

- Edited bump_version.sh to give recomendations on whether software is versioned correctly, rather than actually changing it

### Removed

- N/A
