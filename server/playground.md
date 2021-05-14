# GraphiQL で叩くコード

## Query の取得

```:gql
query
  {
    greet
    allFruits{
      id
      name
      color
      haveEaten
    }
  }
```

## Mutation の実行

```:gql
mutation getFruit($name: String!, $color: String!, $description: String){
  addFruit(name: $name, color: $color, description: $description)
}
```

### Input type を使った場合

```:gql
mutation getFruit($name: String!, $color: String!, $description: String){
  addFruit(name: $name, color: $color, description: $description)
}
```

Query Variables（入力値）

```:json
{
  "input":{
    "name": "ラ・フランス",
    "color": "green"
  }
}
```

### 戻り値が Query の場合

```:gql
mutation eatFruit($name:String!, ){
  eatFruit(name:$name){
    name
    haveEaten
  }
}
```

Query Variables（入力値）

```:json
{
  "name": "apple",
}
```
