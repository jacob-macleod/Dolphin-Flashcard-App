#!/bin/bash

# Go into frontend/src
cd frontend/src || exit 1

# Clone only if the folder does not exist
if [ ! -d "Dolphin-Flashcards-Premium-Features" ]; then
  echo "Cloning Dolphin-Flashcards-Premium-Features..."
  git clone https://github.com/jacob-macleod/Dolphin-Flashcards-Premium-Features.git
else
  echo "Dolphin-Flashcards-Premium-Features already exists, skipping clone."
fi

# Go back to project root
cd ../..

# Create a symbolic link to backend/
if [ ! -L "backend/dolphin_flashcards_premium_features" ]; then
  echo "Creating symlink backend/Dolphin-Flashcards-Premium-Features -> frontend/src/Dolphin-Flashcards-Premium-Features"
  ln -s ../frontend/src/Dolphin-Flashcards-Premium-Features backend/dolphin_flashcards_premium_features
else
  echo "Symlink already exists, skipping."
fi
