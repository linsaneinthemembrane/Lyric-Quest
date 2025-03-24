const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: false, // Make year optional
    validate: {
      validator: function(v) {
        return v === null || (Number.isInteger(v) && v > 1900 && v < 2100);
      },
      message: props => `${props.value} is not a valid year!`
    }
  },
  lyrics: {
    type: String,
    required: true
  },
  words: [{
    word: String,
    position: Number,
    id: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster searches
SongSchema.index({ title: 1, artist: 1 });

module.exports = mongoose.model('Song', SongSchema); 