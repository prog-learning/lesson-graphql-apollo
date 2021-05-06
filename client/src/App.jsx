import React from 'react';
import axios from 'axios';
import { useQuery } from '@apollo/client';
import { EXCHANGE_RATES } from './schema';
function App() {
  fetch('http://localhost:8000/say-hello', {
    mode: 'no-cors',
  }).then(a => console.log(a));
  axios.get('http://localhost:8000/say-hello', {
    mode: 'no-cors',
  }).then(a => console.log(a));

  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  console.log(data);

  return (
    <div>
      <h1>Lesson GraphQL × Apollo</h1>
    </div>
  );
}

export default App;
