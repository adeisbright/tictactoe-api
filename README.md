# TICTACTOE API

TICTACTOE API enables multiplaying of tictactoe game

## Table of Contents

1. Description
1. Table of Contents
1. Current Technology Stack
1. Project Dependencies
1. Installation
1. Configuration
1. Getting Started
1. Testing
1. API Documentation

### Current Technology Stack

TICTACTOE API is built using NodeJS.
To provide business logic for the processes needed to run Eventals , the following technologies are used

-   NodeJS
    > A Javascript Runtime environment for buiding server side applications
-   MongoDB
    > A Document Oriented NoSQL Database

### Project Dependencies

TICTACTOE APIdepends on the following libraries. The libraries are all listed in _[package.json]_.

-   **Express** : NodeJS web application framework that powers Eventals API.
-   **Mongodb** : Client for interacting with MongoDB
-   **axios** for asynchronous HTTP communication between services
-   **bcryptjs** for encrypting password at rest
-   **compression**
-   **dotenv** for loading environment(found inside .env file) variables at runtime
-   **cors** for managing cross origin request
-   **jsonwebtoken** for signing and verifying JSON Web Tokens (JWT)
-   **morgan** for application logging

### Installation

Clone this repository , and install the project dependencies using :

>

    `$ git clone https://github.com/adeisbright/tictactoe-api
    $ cd tictactoe-api
    $ npm install`

### Configuration

Configure the project before you launch it by doing the following :

-   Create a .env file in the root of the application
    The content of the file should contain the following :

>

    LocalDB = "mongodb://127.0.0.1:27017"

    dbName = "tictactoe"

    Server_Port = 8000

### Getting Started

-   Run this command to launch the development server : npm run devstart
-   Create two players
-   Create a new game
-   Make a move
-   When testing set the Databse to the Test DB in App.js . Run : npm run test

### Testing

-   To test the application run :

> `npm run test `

from the project directory

### API Documentation

1. ## Create a game player
    Creates a new player.

-   **URL**
    /players
-   **Method**
    > POST
-   **Body**
    >
          {
              email : "fake@example.com",
              password : "12345678oA#"
          }
-   **Success Response**
    >
          data: {
                  email:"fake@example.com",
                  status: "OK",
                  id:"614e4916ae12ee33fc9d0dec"
                  },
-   **Error Response**

    >

          {
              status : 400 Bad Request Error ,
              message : `Fill the form fields correctly`
          }

    OR

    >

          {
              status : 400 Bad Request Error ,
              message : `A user with same email exist`
          }

    OR

    >

          {
              status : 500 Server Error ,
              message : "{Error Message Differ}"
          }

2. ## Create a new game
    Creates a new game.

-   **URL**
    /tictactoe
-   **Method**
    > POST
-   **Body**
    >
          {
              players : ["614e4916ae12ee33fc9d0dec" , "614e4916ae12ee33fc9d0deb"]
          }
-   **Success Response**
    >
          data: {
              status: "OK",
              id: "514e4916ae12ee33fc9d0dec"
          },
-   **Error Response**

    >

          {
              status : 400 Bad Request Error ,
              message : `Fill the form fields correctly`
          }

    OR

    >

          {
              status : 400 Bad Request Error ,
              message : `A user with same email exist`
          }

    OR

    >

          {
              status : 500 Server Error ,
              message : "{Error Message Differ}"
          }

3. ## Make Move
    Enables a player to make moves while playing the game

-   **URL**
    /tictactoe
-   **Method**
    > PUT
-   **Body**
    >
          {
              gameId: "614e4916ae12ee33fc9d0dec",
              playerId: "614e14add9074d1e402ccd5b"
              coordinates: [1, 2],
          };
-   **Success Response**
    >
          "Still Under Review"
-   **Error Response**

    >

          {
              status : 400 Bad Request Error ,
              message : `Fill the form fields correctly`
          }

    OR

    >

          {
              status : 404 Not Found Error,
              message : `Not Found`
          }

    OR

    >

          {
              status : 400 Bad Request Error,
              message : `Invalid player move`
          }

    OR

    >

          {
              status : 400 Bad Request Error,
              message : `Invalid coodinate numbers provided`
          }

    OR

    >

          {
              status : 400 Bad Request Error,
              message : `Moves already played`
          }

    OR

    >

          {
              status : 500 Server Error ,
              message : "{Error Message Differ}"
          }
