# Flashcard-App
## Broad Overview
This app is designed to improve simiar apps like Quizlet and Anki by implementing a spaced repetition system in an easy to use and visually pleasing UI. The website, which is in development, can be seen [here](http://dolphinflashcards.com)

## USPs and Points of Differentiation
* Flashcard app with nice UI
* Spaced Repetition
* Gamified with lots of "juice"

Anki solely fills the second point, while Quizlet serves the first point. None fully cover all points. This would provide a unique opportunity for this app 

## Broad Overview
A broad overview of the planned features to be made
### Flashcard System
* Log into account
* Create account
* Users should be able to see a tree list of all the cards they have added. They should be able to see which folders everything is in
* There should be an indicator like Anki showing how many cards are there to learn, recap and revise in each folder and set
* You can click a three dot menu to view all cards in the set, not just the ones you need to learn. You can access the same options as below
* When you click this menu, you can also choose to create a card
* When you click on a card or a folder, you view all the cards you need to learn or revise in it as a list
* Flashcards
* Multiple choice QU
* With each qu, you can see whether you know a little, whether you know it well, or not at all
* Cards have HTML code which can be rendered. Images or text can be uploaded
* Folders can be created or deleted. Cards can be created, deleted or moved around
* Anki-Like Algorithm
* More details to follow

### Gamified Features
* Streak, XP
* Leader board with multiple levels. Completing a level in the top 5 pushes you to the next level
* Quests - things like learn x cards, add x cards, get an x day Streak etc
* When you win them you get a badge on your profile
* When you complete one the variable x increases 
* When you win it again the badge looks the same but it has a different number associated with it - the badge number
* Quests give you gold

### Access Control System
* The user that created the flashcard/folder owns the flashcard/folder. If they own the folder, they own all the cards inside it
* Other users can view it but not edit it
* If they want to edit it, they can first clone it
* Users can find flashcards made by other users on a separate search tab
* Users can be given access to flashcard by the owner

## Contributors
Contributors are welcome!

At the moment, the development code reads `firebase_url`, `firebase_config.json` and `credentials.json` when interacting with the database, which are included in `.gitignore` and stores the information for the **production database**. Therefore, if developing, this may need to be worked around by changing some functions into dummy functions. In time, I need to investigate this further and find a final solution.

In addition, you can store data in these files of your own firebase setup, made specifically for testing purposes. This is the ideal option at the moment, and you can use the free firebase tier.

## Server setup

At the moment, a pipeline exists to:
- Build the docker container
- Upload it to docker hub as a private container since it contains keys
- SSH into a GCP VM and update the container

If you want to manually setup the code, follow the following steps:
- `firebase_url`, `firebase_config.json` and `credentials.json` in the overall project directory, which store the url of the firebase instance and the firebase credentials (api key)
- Get the code on the server, using git or docker(your own build of the code)
- If using docker, a `docker-compose.yml` file can be made, using the following information:

```yaml
version: '3'

services:
  flashcard-app:
    image: jacobmacleod/flashcard-app:latest
    ports:
      - "5000:5000" 
```
- `docker-compose up` can be used to build the code, and `docker-compose up --force-recreate --build -d && docker image prune -f` to update the container

