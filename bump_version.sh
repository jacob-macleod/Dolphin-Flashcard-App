#!/bin/bash

# Check if version.txt exists
if [ ! -f version.txt ]; then
    echo "Error: version.txt not found"
    exit 1
fi

# Read current version from version.txt
current_version=$(cat version.txt)

echo "Bumping version with pull request name '$1'"

# Parse MAJOR, MINOR, and PATCH from current version
IFS='.' read -r -a version_parts <<< "$current_version"
major="${version_parts[0]}"
minor="${version_parts[1]}"
patch="${version_parts[2]}"

# Determine which part to increment based on input parameter
if [[ $1 == "MAJOR"* ]]; then
    major=$((major + 1))
elif [[ $1 == "MINOR"* ]]; then
    minor=$((minor + 1))
elif [[ $1 == "PATCH"* ]]; then
    patch=$((patch + 1))
else
    echo "Error: Invalid parameter. Expected MAJOR, MINOR, or PATCH at the start of the pull request title!"
    exit 1
fi

# Update version.txt with the new version
echo "$major.$minor.$patch" > version.txt

echo "Version bumped to $major.$minor.$patch"
