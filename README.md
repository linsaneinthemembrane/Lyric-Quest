# Song Lyric Quiz

An interactive web application where users can play a word-finding game with song lyrics.

## Features

- Search and display song lyrics
- Interactive word-finding game
- Dynamic tile sizes based on word length
- Real-time word recognition
- Progress tracking
- MongoDB integration for caching lyrics

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
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
   ```bash
   npm run dev
   ```

## Project Structure

```
song-lyric-quiz/
├── models/
│   └── Song.js
├── routes/
│   └── songs.js
├── services/
│   └── geniusService.js
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