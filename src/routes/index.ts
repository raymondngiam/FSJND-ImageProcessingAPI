import express from 'express';
import resize from './api/resize';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.render('index');
});

routes.use('/resize', resize);

export default routes;
