import React, { useState } from 'react';
import './DogImageApp.css';
function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDogImage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setImageUrl(data.message);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Random Dog Image</h1>
      <button onClick={fetchDogImage} disabled={loading}>
        {loading ? 'Loading...' : 'Get Random Dog Image'}
      </button>

      {imageUrl && (
        <div>
          <h2>Here is a random dog for you!</h2>
          <img src={imageUrl} alt="Random Dog" style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default App

