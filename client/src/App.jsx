import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, gql } from '@apollo/client';

const ALL_FRUITS = gql`
  query Query {
      allFruits
    }
`;

function App() {
  const [name, setName] = useState('');
  const [eatName, setEatName] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');

  const { loading, error, data } = useQuery(ALL_FRUITS);
  console.log(data);

  const addFruit = () => { };

  return (
    <div>
      <h1>Lesson GraphQL</h1>
      <h3>Add fruit</h3>
      <div>
        <label>name</label>
        <br />
        <input type="text" value={name} onChange={(e) => setName()} />
        <br />
        <label>color</label>
        <br />
        <input type="text" value={color} onChange={(e) => setColor()} />
        <br />
        <label>description</label>
        <br />
        <textarea value={description} onChange={(e) => setDescription()} />
        <br />
        <button>追加</button>
      </div>
      <h3>Add fruit</h3>
      <div>
        <label>何を食べますか？</label>
        <input type="text" value={eatName} onChange={(e) => setEatName()} />
        <button>食べる</button>
      </div>
    </div>
  );
}

export default App;
