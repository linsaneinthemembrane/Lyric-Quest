const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const geniusService = require('../services/geniusService');

// Search for a song
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    console.log('Searching for:', query);
    const results = await geniusService.searchSong(query);
    console.log('Found results:', results.length);
    res.json(results);
  } catch (error) {
    console.error('Error searching for song:', error);
    res.status(500).json({ error: 'Error searching for song' });
  }
});

// Get or create song lyrics
router.post('/lyrics', async (req, res) => {
  try {
    const { title, artist, year, url } = req.body;
    console.log('Fetching lyrics for:', title, 'by', artist, 'year:', year);

    // Check if song exists in database
    let song = await Song.findOne({ title, artist });
    
    if (!song) {
      console.log('Song not found in database, fetching from Genius...');
      // Fetch lyrics from Genius
      const lyrics = await geniusService.getLyrics(url);
      console.log('Lyrics fetched, length:', lyrics.length);
      const words = geniusService.processLyrics(lyrics);

      console.log('Creating new song document with', words.length, 'words');
      // Create new song in database
      song = new Song({
        title,
        artist,
        year: year === 'N/A' ? null : year,
        lyrics,
        words
      });

      try {
        await song.save();
        console.log('Song saved successfully to MongoDB!');
        console.log('MongoDB _id:', song._id);
      } catch (saveError) {
        console.error('Error saving to MongoDB:', saveError);
        throw saveError;
      }
    } else {
      console.log('Song found in database! ID:', song._id);
    }

    res.json(song);
  } catch (error) {
    console.error('Error processing song lyrics:', error);
    res.status(500).json({ error: 'Error processing song lyrics', details: error.message });
  }
});

// Get song by ID
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    console.error('Error fetching song:', error);
    res.status(500).json({ error: 'Error fetching song' });
  }
});

module.exports = router; 