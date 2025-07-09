import React, { useState } from 'react';
import SentimentForm from './components/SentimentForm';
import ResultsList from './components/ResultsList';

function App() {
  const [results, setResults] = useState([]);

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Sentiment Analysis</h1>
      <SentimentForm setResults={setResults} />
      <ResultsList results={results} />
    </div>
  );
}

export default App;
