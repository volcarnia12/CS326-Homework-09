[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7639678&assignment_repo_type=AssignmentRepo)
# COMPSCI 326 Web Programming

## Homework 09 Rules and Fetch

### Due Date and Submission Information

- Expected Due Date: **April 18, 2022, 11:59pm EST**
- Actual Due Date: **April 21, 2022, 11:59pm EST**
  - Because of the holiday this upcoming weekend, the due date has been moved to **April 21, 2022, 11:59pm EST**. You will not be penalized for submitting after April 18th.
  - If you submit before April 18th, you will earn a token.
- **This is an individual assignment**

This documentation is best viewed in a browser by visiting your homework repository and clicking on the `README.md` file. Alternatively, you can use the VSCode [markdown previewer](https://code.visualstudio.com/docs/languages/markdown#_markdown-preview) to view the documentation.

### Submission

To receive credit for this assignment you **must do both** of the following:

- **GitHub Classroom**: Add, commit, and push your changes to GitHub by the assigned due date.
- **Assignment Survey**: Complete and submit this survey: [https://forms.gle/4DLcw7aCMBiVNMdy7](https://forms.gle/4DLcw7aCMBiVNMdy7)

## Overview

This is the ninth part of a series of assignments around the game of Scrabble. We hope that it will be a fun experience in progressively learning all pieces of modern web development, so as to engineer a fully functional game. In this assignment, we will add (most of) the Scrabble rules regarding placement and scoring, as well as use our previously written API.

Please submit this assignment on GitHub Classroom. It will be helpful to come up with test cases, and we encourage you to share them amongst each other; this will make everyone’s code better and is actually how Quality Assurance (QA) can work in practice. However, this is an individual assignment and you cannot share code; submissions will be run against plagiarism detection tools. Additionally, we will be spot checking the code for good coding practices. It is expected your code does not contain (1) extraneous variables/code, (2) missing semicolons, (3) missing curly braces, (4) use of double equals, (5) use of let when a const would suffice, (6) use of var, (7) inconsistent return values. Furthermore, you should use whitespace consistently and to make the code legible.

## Starting Up

Visit the GitHub Classroom link: TBD

After you click the link, accept the assignment, and your repository is created, clone that repository to your computer to begin work. Open the repository folder in VSCode (not just a single file). You will find the following directories and files in your git repository folder in the Explorer side panel:

- **`README.md`**: This file contains markdown text; always included in a git repository.
- **`package.json`**: The package configuration file for this node.js project.
- **`package-lock.json`**: The package dependency versioning information.
- **`client`**: A directory containing the client code.
- **`server`**: A directory containing the server code.

After you have successfully cloned the repository, you can begin working on the assignment. The first step is to install the dependencies:

```bash
npm install
```

We have added a "script" to the `package.json` file to make it easier to start this application. It is common practice to add scripts to simplify the execution of complicated tasks. If you look in the `package.json` file, you will see an entry that looks like this:

```json
  "scripts": {
    "start": "node server/index.js"
  },
```

This script will run the `server/index.js` file. You can run this script by typing the following in the command line:

```bash
npm start
```

This will run the server.

## Task 1 (Client): Adding scrabble rules

The rules for scrabble are important to the overall functioning of the game. Although you are perfectly capable of designing and implementing the algorithms for the game logic, this is out of the scope of this class so we will be providing them for you. The template comes with an updated `game.js` file that contains most of the rules for the game. If you've done extra styling or features in previous homeworks that is not included in the template, you can copy them from your implementation into the `game.js` file provided in the template. So, this is your task for this part of the assignment:

1. Keep the template `client/game.js` file as is.
2. OR, copy the game logic provided in the template `client/game.js` file into your `client/game.js` file and copy that into the provided template code (overwriting the existing `game.js` file).

If you do not have a working version or you do not have enough time, then you can simply use what is provided in the template. If you complete the other tasks before the deadline you may want to come back to this task to take a stab at integrating your own code.

## Task 2 (Server): Refactoring to ExpressJS

In the previous homework we used the built-in Node.js `http` module to create a server. In this assignment, we will be using ExpressJS to create a server and its endpoints. Your job is to refactor your code from the previous homework to use ExpressJS. We have provided the basic scaffolding to get you started. You will need to do the following in the `server/index.js` file:

1. First, you should copy in any helper/utility code that you created in the previous homework. For example, any functions you wrote to read/write the scores to a file. If your implementation did not work you can try to get it working for this assignment or wait for the release of the solution.

2. Add the following ExpressJS middleware to the Express application:

   1. **static**: This middleware will serve static files from the `client` directory. See examples we covered in class for how to do this.

   2. **morgan**: This middleware will log the requests to the console. Make sure you import this library into your application. See examples we covered in class for how to do this.

3. Add the following API endpoints to the Express application:

   1. **POST /wordScore**

      This endpoint will be used to save a word score on the server. The response should only consist of a 200 status code, with a success JSON object (see below).

      **Example Request**:

      [http://localhost:3000/wordScore](http://localhost:3000/wordScore)

      **Example Request Body**:

      ```json
      {
        "name": "Artemis",
        "word": "test",
        "score": 8
      }
      ```

      **Example Response** (200 OK status code):

      ```json
      {
        "status": "success"
      }
      ```

   2. **GET /highestWordScores**

      This endpoint will be used to get the top 10 word scores saved on the server (or top X scores if only X < 10 scores are saved). It should return a JSON response, which will be an array of objects consisting of a word and a score.

      **Example Request**:

      [http://localhost:3000/highestWordScores](http://localhost:3000/highestWordScores)

      **Example Response** (200 OK status code):

      ```json
      [{ "name": "Artemis", "word": "test", "score": 8 }, ..., { "name": "Parzival", "word": "school", "score": 11 }]
      ```

   3. **POST /gameScore**

      This endpoint will be used to save a game score for a single player on the server. The response should only consist of a 200 status code, with no body.

      **Example Request**:

      [http://localhost:3000/gameScore](http://localhost:3000/gameScore)

      **Example Request Body**:

      ```json
      {
        "name": "Artemis",
        "score": 361
      }
      ```

      **Example Response** (200 OK status code):

      ```json
      {
        "status": "success"
      }
      ```

   4. **GET /highestGameScores**

      This endpoint will be used to get the top 10 game scores saved on the server (or top X scores if only X < 10 scores are saved). It should return a JSON response, which will be an array of objects consisting of a name and a score.

      **Example Request**:

      [http://localhost:3000/highestGameScores](http://localhost:3000/highestGameScores)

      **Example Response** (200 OK status code):

      ```json
      [{ "name": "Artemis", "score": 650 }, ..., { "name": "Parzival", "score": 513 }]
      ```

   Like the last server, the saved scores should be persistent: if the server is restarted, it should still have the previous scores saved. For now, you can just use a JSON file that you read and write to. You should be able to copy your solution from the previous homework into this file to continue to support this functionality.

It is recommended that you test each endpoint before proceeding to the next to ensure that it is working correctly. You should use [Postman](https://www.postman.com/downloads/) to manually test each endpoint.

## Task 3 (Client) Using the API endpoints from the browser

Lastly, we will be using the API endpoints from the browser to interact with the server. Your job is to implement the following:

1. When a word is played, the word and score should be saved on the server for the player. You should use the `fetch` browser API and the `POST /wordScore` endpoint to accomplish this. You will need to be aware of using `async` and `await` in your implementation. You will need to use the `fetch` browser API and the `POST /wordScore` endpoint to accomplish this. This will require you to make any function that calls `await fetch` to be an `async` function. After you send the word score to the server you then need to display the word score in the browser. You will likely need to extend the `client/index.html` file to include an HTML element where you will add the word scores. We recommend using a `<table>` element.
2. Add a button to end a game. When the button is clicked, the game score should be saved on the server for the player. You should use the `fetch` browser API and the `POST /gameScore` endpoint to accomplish this. You can optionally add logic to end the game with rules such as **no tiles in the bag** or **no more possible moves**. This is not required.
3. Display a table of the top word scores and game scores. You should use the `fetch` browser API and the `GET /highestWordScores` and `GET /highestGameScores` endpoints to accomplish this. You will likely need to extend the `client/index.html` file to include an HTML element where you will add the game scores. We recommend using a `<table>` element.

## Rubric

This exercise will be scored on the following criteria:

- **Server**

  - **Points 3**: A full understanding is demonstrated. The server starts without errors. The ExpressJS routes are properly written and working perfectly. The code is properly formatted.
  - **Points 2**: A good understanding is demonstrated. The server starts without errors. The ExpressJS routes are written and mostly working, however there may be a few issues that are related to incorrect logic or invalid request or response handling. The code is properly formatted.
  - **Points 1**: A weak understanding is demonstrated. The server starts without errors. The ExpressJS routes are partially written or incomplete. The routes are not a workable solution and contain severe issues that are related to incorrect logic or invalid request or response handling. The code is not properly formatted. Other issues may be present.
  - **Points 0**: A lack of understanding is demonstrated or no submission. The server starts with or without errors, but very little has been modified or what was added is not relevant to this assignment. The ExpressJS routes do not exist or have not relevance to this assignment. There is very little that is identifiable as a solution to this assignment.

- **Play Button and Request/Response**

  - **Points 3**: A full understanding is demonstrated. The play button leads to a POST request to the server. The POST request is handled correctly. The response is correct. Any game state is updated correctly. Code is properly formatted.
  - **Points 2**: A good understanding is demonstrated. The play button leads to a POST request to the server. The POST request is handled. The response is handled. There may be minor errors in the request/response interaction, but it is mostly working. Any game state is updated mostly correctly. Code is properly formatted.
  - **Points 1**: A weak understanding is demonstrated. The play button leads to an incorrect implementation of a POST request/response to/from the server. The POST request is not handled properly and/or The response is not handled properly. Any game state is not updated correctly. Code might not properly formatted. Other issues may be present.
  - **Points 0**: A lack of understanding is demonstrated or no submission. The code is incomplete/missing, does not function properly and/or is not relevant to the assignment and task. There are very clear issues and confusion in the code or very little code is present.

- **End Game Button and Request/Response**

  - **Points 3**: A full understanding is demonstrated. The end game button leads to a POST request to the server. The POST request is handled correctly. The response is correct. Any game state is updated correctly. Code is properly formatted.
  - **Points 2**: A good understanding is demonstrated. The end game button leads to a POST request to the server. The POST request is handled. The response is handled. There may be minor errors in the request/response interaction, but it is mostly working. Any game state is updated mostly correctly. Code is properly formatted.
  - **Points 1**: A weak understanding is demonstrated. The end game button leads to an incorrect implementation of a POST request/response to/from the server. The POST request is not handled properly and/or The response is not handled properly. Any game state is not updated correctly. Code might not properly formatted. Other issues may be present.
  - **Points 0**: A lack of understanding is demonstrated or no submission. The code is incomplete/missing, does not function properly and/or is not relevant to the assignment and task. There are very clear issues and confusion in the code or very little code is present.

- **Display Top Word Scores**

  - **Points 3**: A full understanding is demonstrated. The top word scores are displayed correctly. The table is properly formatted.
  - **Points 2**: A good understanding is demonstrated. The top word scores are displayed correctly. The table is formatted.
  - **Points 1**: A weak understanding is demonstrated. The top word scores are displayed incorrectly. The table is not formatted. Other issues may be present.
  - **Points 0**: A lack of understanding is demonstrated or no submission. The table is incomplete/missing, does not function properly and/or is not relevant to the assignment and task. There are very clear issues and confusion in the code or very little code is present.

- **Display Top Game Scores**

  - **Points 3**: A full understanding is demonstrated. The top word scores are displayed correctly. The table is properly formatted.
  - **Points 2**: A good understanding is demonstrated. The top word scores are displayed correctly. The table is formatted.
  - **Points 1**: A weak understanding is demonstrated. The top word scores are displayed incorrectly. The table is not formatted. Other issues may be present.
  - **Points 0**: A lack of understanding is demonstrated or no submission. The table is incomplete/missing, does not function properly and/or is not relevant to the assignment and task. There are very clear issues and confusion in the code or very little code is present.

**Maximum Score Possible**: **15**
