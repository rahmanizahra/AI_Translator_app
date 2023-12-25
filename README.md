
# AI Translation App

This is a web application that provides translation services using AI. It consists of a frontend built with React, a backend built with Express.js, and a SQLite3 database.

## Installation

1. Clone the repository: `git clone https://github.com/TAV-College/final-project-zahra-kiana-hadis.git`
2. Navigate to the project directory: `cd AI_TRANSLATOR_APP`
3. Install dependencies for the frontend: `cd my-app && npm install`
4. Install dependencies for the backend: `cd ../backend && npm install`

## Usage

1. Start the backend server: `cd backend && npm start`
2. Start the frontend development server: `cd ../frontend && npm start`
3. Open your browser and visit `http://localhost:3000` to access the application.

## File Structure

- `frontend/`: Contains the React frontend code.
- `backend/`: Contains the Express.js backend code.
- `database/`: Contains the SQLite3 database file.

# Frontend:my-app

This is a React application that provides translation and rewriting services using an AI-powered backend.

## Getting Started

 To get started with the AI Translator App, follow these steps:

  1. Clone the repository to your local machine.
  2. Install the required dependencies by running `npm install` in the project directory.
  3. Start the development server by running `npm start`.
  4. Open your browser and navigate to `http://localhost:3000` to access the application.

 ## Features

  - Translation: Enter a message and select a target language to translate the message.
  - Rewriting: Enter a message and select a language to rewrite the message using AI-powered techniques.
  - Copy to Clipboard: Copy the translated or rewritten text to the clipboard with a single click.

 ## File Structure

  The important files and directories in this project are as follows:

  - `src/App.js`: The main component that renders the AI Translator App.
  - `src/App.css`: The CSS file for styling the app.
 

## Dependencies

    The following dependencies are used in this project:

  - `react`: JavaScript library for building user interfaces.
  - `react-router-dom`: Routing library for React applications.
  - `react-spinners`: Library for displaying loading spinners.
  - `bootstrap`: CSS framework for styling the app.

## API Configuration

    The AI Translator App communicates with a backend API for translation and rewriting. The API URL is set to `http://localhost:3001/api` in the `App.js` file. Make sure to update the API URL if your backend is hosted on a different server.

# AI Translator App Backend
This is the backend server for the AI Translator App. It provides APIs for translating and paraphrasing text using the OpenAI API.

## Getting Started

To get started with the backend server, follow the instructions below.

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

 ```shell
 git clone https://github.com/TAV-College/final-project-zahra-kiana-hadis.git
 ```

2. Install the dependencies:

```shell
  cd ai-translator-app-backend
  npm install
```

3. Set up environment variables:

  - Create a `.env` file in the root directory.
  - Add the following environment variables to the `.env` file:

### Usage

1. Start the server:
 ```shell
  npm start
 ```
  The server will start running on port 3001.

2. Access the API documentation:

  Open your web browser and navigate to `http://localhost:3001/api-docs` to access the Swagger API documentation.

3. Use the provided APIs to translate and paraphrase text.

## API Endpoints

- `POST /api/translations`: Create a new translation entry in the database.
- `GET /api/translations`: Retrieve all translations from the database.

## Technologies Used

- Node.js
- Express.js
- OpenAI API
- SQLite

## Database Setup

The backend uses an SQLite database to store user information and translations. The database is created in memory and does not persist data between sessions.

To set up the database, follow these steps:

1. Open the `core/database.js` file.
2. Locate the following code block:


## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m "Add your commit message"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
