# URL Shortener Microservice

## Overview
This is a URL Shortener Microservice project from freeCodeCamp's Back End Development and APIs curriculum. It's a Node.js/Express application that provides both a web interface and API endpoints for shortening URLs.

## Project Architecture
- **Language**: Node.js
- **Framework**: Express.js
- **Structure**:
  - `index.js` - Main server file
  - `views/` - HTML templates
  - `public/` - Static assets (CSS)
  - Port: 5000 (configured for Replit)

## Dependencies
- express: Web framework
- cors: Cross-origin resource sharing
- body-parser: Parse incoming request bodies
- dotenv: Environment variable management

## Features Implemented
- **URL Validation**: Validates URLs to accept only http:// and https:// protocols
- **POST /api/shorturl**: Creates shortened URLs and returns JSON with `original_url` and `short_url` properties
- **GET /api/shorturl/:short_url**: Redirects to the original URL
- **Error Handling**: Returns `{ error: 'invalid url' }` for invalid URLs
- **In-Memory Storage**: Uses array-based storage for URL mappings (suitable for development/testing)

## API Endpoints
- `POST /api/shorturl` - Submit a URL to be shortened
- `GET /api/shorturl/:id` - Redirect to the original URL by short URL ID
- `GET /api/hello` - Test endpoint

## Recent Changes
- **October 15, 2025**: Complete implementation
  - Configured server to bind to 0.0.0.0:5000 for Replit environment
  - Added body-parser middleware for handling POST requests
  - Implemented URL validation with http/https protocol checking
  - Created POST endpoint for URL shortening with duplicate detection
  - Created GET endpoint for URL redirection
  - All freeCodeCamp requirements met and tested

## Running the Project
The application runs with `npm start` which executes `node index.js`.

## Current State
- Fully functional URL shortener microservice
- All freeCodeCamp requirements implemented and tested
- Ready for deployment
