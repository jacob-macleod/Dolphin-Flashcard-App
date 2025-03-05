# Title

## Description

Has an accurate description of the details made been given?

## Pull Requestor Checklist

- [ ] Does `backend/database/database_config.py` have the type of `production`?
- [ ] Does `frontend/src/api/config.js` have the correct server url, reading from the deployed instance at `http://dolphinflashcards.com/api/`?
- [ ] If not merging `development` to `main`, is the MR title prefixed with `MAJOR`, `MINOR` or `PATCH`?
- [ ] Has `backend/__init__.py` been updated with the relevant version, following the [semantic versioning standard](https://semver.org)
- [ ] Has `CHANGELOG.md` been updated to explain the new version?
