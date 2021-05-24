import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const ALL_FRUITS = gql`
  query {
      allFruits {
        id
        icon
        name
        color
        haveEaten
        description
      }
    }
`;
// const GET_FRUIT = gql`
//   mutation AddFruit($icon: String!, $name: String!, $color:String!, $description: String) {
//     addFruit(icon: $icon, name: $name, color: $color, description: $description)
//   }
// `;
const GET_FRUIT = gql`
  mutation getFruit($input: PostFruit!) {
    addFruit(data: $input)
  }
`;

function App() {
  const [name, setName] = useState('デコポン');
  const [color, setColor] = useState('orange');
  const [description, setDescription] = useState('でべそがある');

  const [eatName, setEatName] = useState('');

  const { loading, error, data } = useQuery(ALL_FRUITS);

  const [mutationName] = useMutation(GET_FRUIT);

  // const addFruit = () => {
  //   mutationName({
  //     variables: {
  //       input: {
  //         icon: '🍊',
  //         name
  //         color,
  //         description,
  //       }
  //     }
  //   });
  // };

  const addFruit = () => {
    const get = mutationName({
      variables: {
        input: {
          icon: '🍊',
          name: name,
          color: 'orange',
          description: 'でべそがある',
        }
      }
    });
    get.then(a => console.log(a.data.addFruit));
  };

  console.log(data);
  error && console.log(error);


  return (
    <div>
      <h1>Lesson GraphQL</h1>
      <h2>My fruits</h2>
      {loading && <p>読込中...</p>}
      {data?.allFruits.map(item => <div key={item.id}>
        <h3>{item.icon} {item.name}</h3>
        <p>説明: {item.description}</p>
        <p>{item.haveEaten ? '食べたことがある' : 'まだ食べてない'}</p>
      </div>)}
      <hr />

      <h2>Add fruit</h2>
      <label>name</label>
      <br />
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label>color</label>
      <br />
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value='red'>red</option>
        <option value='green'>green</option>
        <option value='orange'>orange</option>
        <option value='yellow'>yellow</option>
        <option value='blue'>blue</option>
        <option value='purple'>purple</option>
        <option value='pink'>pink</option>
        <option value='gray'>gray</option> {/* Error */}
      </select>
      <br />
      <label>description</label>
      <br />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <br />
      <button onClick={addFruit}>追加</button>
      <hr />

      <h2>Eat fruit</h2>
      <div>
        <label>何を食べますか？</label>
        <input type="text" value={eatName} onChange={(e) => setEatName(e.target.value)} />
        <button>食べる</button>
      </div>
    </div>
  );
}

export default App;
