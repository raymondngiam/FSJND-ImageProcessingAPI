import express from 'express';
import resize from './api/resize';

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.render('index');
});

routes.use('/resize', resize);

export default routes;
