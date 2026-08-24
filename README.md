# Random Joke Generator

Simple Node.js + Express app that proxies JokeAPI (https://v2.jokeapi.dev) and serves a tiny frontend.

Setup
1. Install:
   npm install

2. Start:
   npm start
   (or `npm run dev` if you want hot reload with nodemon)

3. Open http://localhost:3000

Notes
- The backend endpoint `/api/joke` calls the external JokeAPI. This avoids CORS issues and lets you add caching, rate-limiting, or an API key later.
- To call the external API directly from the browser (no server), use:
  fetch('https://v2.jokeapi.dev/joke/Any?type=single').then(...)
  But beware of CORS and rate-limits.
- You can change JokeAPI parameters (categories, blacklistFlags, language, type) in server.js's URL.
- Add caching (in-memory or redis) to reduce calls to the external API if you expect high traffic.
