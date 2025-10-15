require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// In-memory storage for URLs
const urlDatabase = [];
let shortUrlCounter = 1;

// URL validation function
function isValidUrl(urlString) {
  try {
    const url = new URL(urlString);
    // Check if the protocol is http or https
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

// POST endpoint to create short URL
app.post('/api/shorturl', function(req, res) {
  const originalUrl = req.body.url;
  
  // Validate URL
  if (!isValidUrl(originalUrl)) {
    return res.json({ error: 'invalid url' });
  }
  
  // Check if URL already exists
  const existingUrl = urlDatabase.find(entry => entry.original_url === originalUrl);
  if (existingUrl) {
    return res.json({
      original_url: existingUrl.original_url,
      short_url: existingUrl.short_url
    });
  }
  
  // Create new short URL
  const shortUrl = shortUrlCounter++;
  urlDatabase.push({
    original_url: originalUrl,
    short_url: shortUrl
  });
  
  res.json({
    original_url: originalUrl,
    short_url: shortUrl
  });
});

// GET endpoint to redirect to original URL
app.get('/api/shorturl/:short_url', function(req, res) {
  const shortUrl = parseInt(req.params.short_url);
  
  const urlEntry = urlDatabase.find(entry => entry.short_url === shortUrl);
  
  if (urlEntry) {
    res.redirect(urlEntry.original_url);
  } else {
    res.json({ error: 'No short URL found for the given input' });
  }
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, '0.0.0.0', function() {
  console.log(`Listening on port ${port}`);
});
