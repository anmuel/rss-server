import * as express from 'express';
import controller from './controller';
import l from '../../../common/logger';
import feedsService from '../../services/feeds.service';

export default express
  .Router()
  .use((req, res, next) => {
    l.debug(__filename, `Request to ${req.url}`);
    next();
  })
  .get('/:id', controller.byId)
  .get('/', controller.all)
  .post('/', controller.create)
  .param('id', (req, res, next, val) => {
    feedsService.byId(val)
      .then(feed => {
        req.feed = feed;
        next();
      })
      .catch(next);
  });
