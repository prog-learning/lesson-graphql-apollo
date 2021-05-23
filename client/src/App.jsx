import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const ALL_FRUITS = gql`
  query {
      allFruits{
        id
        name
        color
        haveEaten
        description
      }
    }
`;
const GET_FRUIT = gql`
  mutation getFruit($name:String!, $color:String!, $description:String){
    addFruit(name:$name, color:$color, description:$description)
  }
`;

function App() {
  const [name, setName] = useState('');
  const [eatName, setEatName] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');

  const { loading, error, data } = useQuery(ALL_FRUITS);
  const [mutationName] = useMutation(GET_FRUIT);

  const addFruit = () => {
    mutationName({
      variables: {
        name: "デコポン",
        color: "orange",
        description: "でべそある",
      }
    });
  };

  console.log(data);


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
