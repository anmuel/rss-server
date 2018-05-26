import mongoose from 'mongoose';
import l from '../../common/logger';

const { Schema } = mongoose;

const dbUrl = 'mongodb://localhost:27017';
const schema = new Schema({
  // id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  url: { type: String, required: true },
  creation_date: { type: Date, default: Date.now },
});
const Feed = mongoose.model('Feed', schema);

class FeedsDatabase {
  constructor() {
    mongoose.connect(dbUrl);
    this._db = mongoose.connection;
    this._db.on('error', l.error.bind(l, 'connection error'));
    this._db.once('open', () => {
      l.info(__filename, 'connected to database %s', dbUrl);
    });
  }

  all() {
    return Feed.find({}).exec();
  }

  byId(id) {
    return Feed.findById(id).exec();
  }

  insert(feedData) {
    const feed = new Feed();
    feed.name = feedData.name;
    feed.url = feedData.url;
    return feed.save();
  }

  deleteAll() {
    return Feed.find().remove().exec();
  }
}

export default new FeedsDatabase();
