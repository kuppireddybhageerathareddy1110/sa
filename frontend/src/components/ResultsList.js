import React from 'react';

const ResultsList = ({ results }) => {
  if (!results.length) return null;

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Results</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {results.map((res, idx) => (
          <li key={idx} style={{
            margin: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            background: '#f9f9f9'
          }}>
            {res.text} — <strong>{res.sentiment}</strong> {res.sentiment === 'Positive' ? '😊' : res.sentiment === 'Negative' ? '😞' : '😐'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsList;
