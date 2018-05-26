import l from '../../common/logger';
import db from './feeds.db.service';

class FeedsService {
  all() {
    l.debug(__filename, `${this.constructor.name}.all()`);
    return db.all();
  }

  byId(id) {
    l.debug(__filename, `${this.constructor.name}.byId(${id})`);
    return db.byId(id);
  }

  create(feed) {
    return db.insert(feed);
  }
}

export default new FeedsService();
