import express from 'express';

const app = express();

app.get('/', (request, response) => {
  response.send('OLá mundo');
});

app.listen(3333, () => {
  console.log('Server is running at port 3333 🚀');
});
