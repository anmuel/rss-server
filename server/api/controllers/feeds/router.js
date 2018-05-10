import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.create)
  .get('/:uuid(^[\d\w]{24}$)', controller.byId)
  .get('/', controller.all);
