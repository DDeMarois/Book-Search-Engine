# Book Search Engine

## Overview

This project is a refactor of a fully functional Google Books API search engine built with a RESTful API. The goal is to convert it into a GraphQL API using Apollo Server. The application is developed using the MERN stack:

- **MongoDB** for the database
- **Express.js** and **Node.js** for the server and API
- **React** for the front-end interface

The app allows users to search for books using the Google Books API and save their favorite searches to the backend for future reference.

---

## Features

- Search for books using the Google Books API.
- Display search results on the front-end.
- Save book searches to the backend.

---

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API:** GraphQL (Apollo Server)
- **External API:** Google Books API

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DDeMarois/Book-Search-Engine.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     MONGODB_URI=your-mongodb-connection-string
     JWT_SECRET_KEY=your-secret-key
     ```

5. Start the development server:
   ```bash
   npm run develop
   ```

---

## Usage

1. Open the application in your browser:
   - Default URL: `http://localhost:3000`

2. Search for books by entering a query in the search bar.
3. Save your favorite books to the backend by clicking the "Save" button.
4. View your saved books in the "Saved Books" section.

---

## Refactoring Details

---

## Scripts

- `npm run start`: Start the production server.
- `npm run develop`: Start the development server with live reloading.
- `npm run build`: Build the front-end for production.
- `npm run test`: Run test cases.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- [Google Books API](https://developers.google.com/books)
- [MERN Stack](https://www.mongodb.com/mern-stack)
- [Apollo GraphQL](https://www.apollographql.com/)

## Credits

- Drew DeMarois
- GitHub: DDeMarois


