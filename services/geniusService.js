const axios = require('axios');
const cheerio = require('cheerio');

class GeniusService {
  constructor() {
    this.baseUrl = 'https://api.genius.com';
    this.accessToken = process.env.GENIUS_ACCESS_TOKEN;
    this.clientId = process.env.GENIUS_CLIENT_ID;
    this.clientSecret = process.env.GENIUS_CLIENT_SECRET;
  }

  getHeaders() {
    return {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    };
  }

  async searchSong(query) {
    try {
      console.log('Making API request to Genius...');
      const response = await axios.get(`${this.baseUrl}/search`, {
        headers: this.getHeaders(),
        params: {
          q: query
        }
      });
      console.log('Received response from Genius API');

      return response.data.response.hits.map(hit => {
        // Extract year from release date
        let year = 'N/A';
        if (hit.result.release_date_for_display) {
          const dateMatch = hit.result.release_date_for_display.match(/\d{4}/);
          if (dateMatch) {
            year = parseInt(dateMatch[0]);
          }
        }

        return {
          title: hit.result.title,
          artist: hit.result.primary_artist.name,
          year,
          url: hit.result.url
        };
      });
    } catch (error) {
      console.error('Error searching song:', error.response?.data || error.message);
      throw error;
    }
  }

  async getLyrics(url) {
    try {
      console.log('Fetching lyrics from URL:', url);
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      
      let lyrics = '';
      
      // Try different selectors that Genius might use
      const lyricsContainers = [
        '[class*="Lyrics__Container"]',
        '.lyrics',
        '[class^="SongPage__Section"]',
        '[class*="Lyrics__Root"]',
        '[class*="lyrics"]'
      ];

      for (const container of lyricsContainers) {
        const element = $(container);
        if (element.length) {
          // Replace HTML elements with appropriate spacing
          element.find('br').replaceWith('\n');
          element.find('div').append('\n');
          
          // Get text content
          lyrics = element.text()
            .replace(/\r\n/g, '\n') // Normalize line endings
            .replace(/\[.*?\]/g, '') // Remove [Verse], [Chorus], etc.
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n');
          
          if (lyrics.length > 0) break;
        }
      }
      
      if (!lyrics) {
        console.log('No lyrics found with standard selectors, trying alternative approach...');
        const content = $('[class*="SongPage__Content"]');
        content.find('br').replaceWith('\n');
        content.find('div').append('\n');
        lyrics = content.text()
          .replace(/\r\n/g, '\n')
          .replace(/\[.*?\]/g, '')
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .join('\n');
      }

      if (!lyrics) {
        throw new Error('No lyrics found on the page');
      }

      console.log('Lyrics found, length:', lyrics.length);
      console.log('First 100 characters:', lyrics.substring(0, 100));
      return lyrics;
    } catch (error) {
      console.error('Error fetching lyrics:', error.message);
      throw error;
    }
  }

  processLyrics(lyrics) {
    console.log('Processing lyrics...');
    
    // Split lyrics into words while preserving line structure
    const lines = lyrics.split('\n');
    const processedWords = [];
    let position = 0;
    
    lines.forEach(line => {
      // Clean the line but preserve all words
      const lineWords = line
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\[\]"]/g, '') // Remove punctuation
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0);
      
      lineWords.forEach(word => {
        // Create a unique identifier for each instance of a word
        processedWords.push({
          word,
          position,
          id: `${word}-${position}` // Add unique ID for each instance
        });
        position++;
      });
    });

    console.log('Total words found:', processedWords.length);
    
    return processedWords;
  }

  // Helper method to check if we need to refresh the access token
  async checkAndRefreshToken() {
    // You might want to implement token refresh logic here if needed
    // For now, we'll just use the access token we have
  }
}

module.exports = new GeniusService(); 