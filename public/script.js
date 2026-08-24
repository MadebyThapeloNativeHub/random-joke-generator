const getJokeBtn = document.getElementById('getJoke');
const jokeEl = document.getElementById('joke');
const sourceEl = document.getElementById('source');
const copyBtn = document.getElementById('copyBtn');

async function fetchJoke() {
  jokeEl.textContent = 'Loading…';
  sourceEl.textContent = '';
  try {
    const res = await fetch('/api/joke');
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    if (data.success) {
      jokeEl.textContent = data.joke;
      sourceEl.textContent = `Source: ${data.source}`;
    } else {
      jokeEl.textContent = 'No joke available.';
    }
  } catch (err) {
    console.error('Fetch error:', err);
    jokeEl.textContent = 'Could not fetch a joke. Try again later.';
  }
}

getJokeBtn.addEventListener('click', fetchJoke);

copyBtn.addEventListener('click', () => {
  const text = jokeEl.textContent || '';
  if (!text) return;
  navigator.clipboard?.writeText(text).then(() => {
    copyBtn.textContent = 'Copied!';
    setTimeout(() => (copyBtn.textContent = 'Copy'), 1200);
  }).catch(() => {
    copyBtn.textContent = 'Copy failed';
    setTimeout(() => (copyBtn.textContent = 'Copy'), 1200);
  });
});

// Optionally load a joke on page load
// fetchJoke();
