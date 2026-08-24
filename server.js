const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint to external JokeAPI
app.get('/api/joke', async (req, res) => {
  try {
    // Example: request a single-line joke. Change params as needed.
    const url = 'https://v2.jokeapi.dev/joke/Any?type=single';
    const resp = await axios.get(url, { timeout: 5000 });
    const data = resp.data;

    // JokeAPI returns different shapes; normalize to { joke, source }
    let jokeText = '';
    if (data && data.joke) {
      jokeText = data.joke;
    } else if (data && data.setup && data.delivery) {
      jokeText = `${data.setup} — ${data.delivery}`;
    } else {
      jokeText = 'No joke found.';
    }

    res.json({
      success: true,
      joke: jokeText,
      raw: data,
      source: 'https://v2.jokeapi.dev'
    });
  } catch (err) {
    console.error('Error fetching joke:', err.message || err);
    res.status(502).json({
      success: false,
      message: 'Failed to fetch a joke from external API.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Joke generator running on http://localhost:${PORT}`);
});
