import { app } from './app';

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server is running at port ${process.env.PORT || 3333} 🚀`);
});
