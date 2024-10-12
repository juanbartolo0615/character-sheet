## Introduction

This project is going to be a DND character sheet based of the player's handbook. It will be essential to build your character along with the player's hanboook.

## Requirements

The only thing you will need to run this code is Docker Desktop installed. If you don't have it installed go to the official [Docker website](https://docs.docker.com/desktop/) and follow the instructions.

## Running the Code

As long as you have completed the installation of the code you can now run this project. First you will need to open up a terminal and Docker Desktop. Once you have both open run this command in the terminal.

> docker volume create character-sheet

This will create a new volume that will act as your database for this project. Next run this code in your terminal

> docker compose build

This will create the docker images from the docker-compose.yaml file to allow you the run the servers for the code. This will install all the dependencies to the docker image so it can take a while. Finally run this code in your terminal.

> docker compose up -d

This will finally get your docker containers up and running with the FastAPI and the React server. Looking at your docker docker desktop in the containers section you will see three containers up and running. Check out the logs and wait for the servers to get up and running. You can checkout the front end at [localhost:3000](http://localhost:3000/) and the FastAPI docs at [localhost:8000/docs#](http://localhost:8000/docs#/). Depending if your on windows the front end server might take a little bit longer to get up and running the first time around.

## Alembic Commands

alembic revision --autogenerate -m "{message}"

alembic upgrade heads
