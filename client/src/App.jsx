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
  const [name, setName] = useState('');
  const [eatName, setEatName] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');

  const { loading, error, data } = useQuery(ALL_FRUITS);
  const [mutationName] = useMutation(GET_FRUIT);

  // const addFruit = () => {
  //   mutationName({
  //     variables: {
  //       input: {
  //         icon: '🍊',
  //         name: "デコポン",
  //         color: "orange",
  //         description: "でべそある",
  //       }
  //     }
  //   });
  // };
  const addFruit = () => {
    const get = mutationName({
      variables: {
        input: {
          icon: '🍊',
          name: "デコポン",
          color: "orange",
          description: "でべそある",
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
      <h2>Fruit List</h2>
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
      <button onClick={addFruit}>追加</button>
      <hr />
      <h2>Eat fruit</h2>
      <div>
        <label>何を食べますか？</label>
        <input type="text" value={eatName} onChange={(e) => setEatName()} />
        <button>食べる</button>
      </div>
    </div>
  );
}

export default App;
