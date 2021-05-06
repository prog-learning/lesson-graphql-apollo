const express = require('express');
const app = express();

// ルート（http://localhost/）にアクセスしてきたときに「Hello」を返す
app.get('/say-hello', (req, res) => {
  // res.set({ 'Access-Control-Allow-Origin': '*' });
  res.send('Hello!!');
  res.json('Hello!!');
});

// Port8000でサーバを立てる
app.listen(8000, () => console.log('Listening on port 8000'));
