import feedsRouter from './api/controllers/feeds/router';
import l from './common/logger';


export default function routes(app) {
  app.use('/api/v1/feeds', feedsRouter);
  app.get('*', (req, res) => {
    l.debug(req);
    res.send(404);
  });
}
