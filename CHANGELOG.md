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
