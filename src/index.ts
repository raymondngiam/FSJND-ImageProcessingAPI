import express from 'express';
import routes from './routes/index';
import path from 'path';

const app = express();
const port = 3000;
const publicPath = path.resolve(__dirname, 'public');
const viewsPath = path.resolve(__dirname, 'views');

app.use('/public', express.static(publicPath));
app.set('views', viewsPath);
app.set('view engine', 'ejs');
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

// for dummy test
const add = (a: number, b: number): number => {
  return a + b;
};

export default { add };
