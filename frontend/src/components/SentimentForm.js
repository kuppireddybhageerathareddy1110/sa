import React, { useState } from 'react';
import axios from 'axios';

const SentimentForm = ({ setResults }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/analyze`, { text });
      setResults(res.data.results);
      setText('');
    } catch (error) {
      alert("Error contacting backend: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows="5"
        cols="60"
        value={text}
        placeholder="Enter text for analysis..."
        onChange={(e) => setText(e.target.value)}
        required
      />
      <br />
      <button type="submit">Analyze</button>
    </form>
  );
};

export default SentimentForm;
