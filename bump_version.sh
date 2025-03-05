#!/bin/bash
init_file=backend/__init__.py

# Check if version.txt exists
if [ ! -f $init_file ]; then
    echo "Error: $init_file not found"
    exit 1
fi

# Read current version from version.txt
entered_version=$(grep -Eo "__version__ = \"[0-9]+\.[0-9]+\.[0-9]+\"" "$init_file" | awk -F '"' '{print $2}')
echo "Entered version"
echo $entered_version
git checkout development
git fetch --tags
# current_version=$(git describe --tags --abbrev=0)
current_version=$(git tag --sort=-creatordate | grep -m 1 '.*')
git switch $2

echo "Checking version $current_version has been updated correctly according to pull request name '$1'"

# Parse MAJOR, MINOR, and PATCH from current version
IFS='.' read -r -a version_parts <<< "$current_version"
major="${version_parts[0]}"
minor="${version_parts[1]}"
patch="${version_parts[2]}"

# Determine which part to increment based on input parameter
if [[ $1 == "MAJOR"* ]]; then
    major=$((major + 1))
    minor=0
    patch=0
elif [[ $1 == "MINOR"* ]]; then
    minor=$((minor + 1))
    patch=0
elif [[ $1 == "PATCH"* ]]; then
    patch=$((patch + 1))
else
    echo "Error: Invalid parameter. Expected MAJOR, MINOR, or PATCH at the start of the pull request title!"
    exit 1
fi

# Update version.txt with the new version
new_version="$major.$minor.$patch"

echo $new_version
echo $entered_version

if [ "$entered_version" == "$current_version" ]; then echo "You haven't updated the version in $init_file from $entered_version to $new_version"; exit 1; fi
if [ "$entered_version" != "$new_version" ]; then echo "You haven't updated the version in $init_file correctly from $current_version to $new_version"; exit 1; fi
if [ "$entered_version" == "$new_version" ]; then echo "You have successfully updated the version to $entered_version"; exit 0; fi
