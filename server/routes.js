import feedsRouter from './api/controllers/feeds/router';

export default function routes(app) {
  app.use('/api/v1/feeds', feedsRouter);
}
