const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

// environment variables
dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per windowMs limit
});
app.use(limiter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/song-lyric-quiz', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Routes
const songsRouter = require('./routes/songs');
app.use('/api/songs', songsRouter);

// handling middleware error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
