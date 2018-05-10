import FeedsService from '../../services/feeds.service';
import l from '../../../common/logger';

export class FeedsController {
  all(req, res) {
    FeedsService.all()
      .then(r => res.json(r))
      .catch(err => {
        l.errorr(err);
        res.status(500).end();
      });
  }

  byId(req, res) {
    const { uuid } = req.params;
    l.info('Controller get by id route %s', uuid);
    FeedsService
      .byId(uuid)
      .then(r => {
        if (r) {
          res.json(r);
        } else {
          res.status(404).json().end();
        }
      })
      .catch(err => {
        l.warn(err);
        res.status(404).json().end();
      });
  }

  create(req, res) {
    const feed = { url: req.body.url, name: req.body.name };
    FeedsService
      .create(feed)
      .then(r => res
        .status(201)
        .location(`/api/v1/feeds/${r.id}`)
        .json(r))
      .catch(err => {
        l.error(err);
        res.status(500).json().end();
      });
  }
}
export default new FeedsController();
