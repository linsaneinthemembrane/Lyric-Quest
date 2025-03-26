# Lyric Quest

An interactive web application where users can play a word-finding game with song lyrics.

### Demo Video
[![Lyric Quest Demo](https://img.youtube.com/vi/IVe_ju5THCs/maxresdefault.jpg)](https://youtu.be/IVe_ju5THCs?feature=shared)

## Overview

This project aims to create an engaging experience for music enthusiasts by leveraging song lyrics from a third-party API, caching them in MongoDB, and building a dynamic music word hunt.

---

## **Why I Built This Project**

This is my **first JavaScript project**, and it was created to learn and grow as a developer. My goals were to:

- Gain hands-on experience with **Node.js** and **MongoDB**.
- Understand how to interact with third-party APIs.
- Build a full-stack web application from scratch.
- Strengthen my skills in **React** for frontend development.
- Learn how to manage state, handle asynchronous operations, and improve error handling.

This project represents my journey into JavaScript development and showcases what I’ve learned so far.

---

## Features

- **Search and Display Song Lyrics**: Users can search for songs and view their lyrics.
- **Interactive Word-Finding Game**: Players find words within the lyrics, with real-time recognition and feedback.
- **Dynamic Tile Sizes**: Word tiles are sized based on the length of the word for better readability.
- **Progress Tracking**: Users can track their progress as they find more words.
- **MongoDB Integration**: Lyrics are cached in MongoDB for efficient retrieval and reduced API calls.

## Pipeline

1. **API Integration**: The application uses a third-party API (e.g., Genius) to fetch song lyrics.
2. **MongoDB Caching**: Lyrics are stored in a MongoDB database to reduce API calls and improve performance.
3. **Frontend Interaction**: Users interact with the application through a React-based frontend, which handles the word-finding game logic.

## Learning Experiences

- **API Management**: Learned how to manage API keys securely and handle rate limits.
- **MongoDB Integration**: Gained experience with MongoDB schema design and data caching strategies.
- **Frontend Development**: Improved skills in React, including state management and component optimization.
- **Error Handling**: Developed robust error handling for API calls and database operations.

## Next Steps

- **Enhance User Experience**: Implement features like user profiles, high scores, and social sharing.
- **Expand API Integration**: Integrate additional music APIs for broader song coverage.
- **Optimize Performance**: Further optimize MongoDB queries and API calls for better performance.
- **Mobile App Development**: Develop a mobile app version for broader accessibility.
- **AI-Powered Features**: Explore integrating AI for features like lyric analysis or song recommendations.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:

```
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/song-lyric-quiz
NODE_ENV=development
GENIUS_ACCESS_TOKEN=your_access_token_here
GENIUS_CLIENT_ID=your_client_id_here
GENIUS_CLIENT_SECRET=your_client_secret_here
```
4. Start MongoDB on your local machine
5. Start the development server:

```
npm run dev
```

## Project Structure

```
song-lyric-quiz/
├── models/
│ └── Song.js
├── routes/
│ └── songs.js
├── services/
│ └── geniusService.js
├── server.js
├── package.json
└── .env
```


## API Endpoints

- `GET /api/songs/search?query=<search_term>` - Search for songs
- `POST /api/songs/lyrics` - Get or create song lyrics
- `GET /api/songs/:id` - Get song by ID

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
