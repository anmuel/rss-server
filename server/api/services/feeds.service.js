import l from '../../common/logger';
import db from './feeds.db.service';

class FeedsService {
  all() {
    l.info(`${this.constructor.name}.all()`);
    return db.all();
  }

  byId(id) {
    l.info(`${this.constructor.name}.byId(${id})`);
    return db.byId(id);
  }

  create(feed) {
    return db.insert(feed);
  }
}

export default new FeedsService();
