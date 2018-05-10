import chai from 'chai';
import faker from 'faker';
import request from 'supertest';
import Server from '../../../../server';
import FeedsDatabase from '../../../../server/api/services/feeds.db.service';
import l from '../../../../server/common/logger';

const { expect } = chai;

describe('FeedsController', () => {
  let createdFeed;
  before(() => {
    return FeedsDatabase.deleteAll().then(() => {
      return FeedsDatabase.insert({
        name: faker.internet.domainName(),
        url: faker.internet.url(),
      }).then(f => {
        createdFeed = f;
      });
    });
  });

  it('should get all feeds', () =>
    request(Server)
      .get('/api/v1/feeds')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array').lengthOf(1);
      }));

  it('should add a new feed', () => {
    const feedData = {
      name: faker.internet.domainName(),
      url: faker.internet.url(),
    };
    request(Server)
      .post('/api/v1/feeds')
      .send(feedData)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(r => {
        const { body } = r;
        expect(body)
          .to.be.an.an('object')
          .that.has.property('name')
          .equal(feedData.name);
        expect(body.url).to.be.a('string').that.eql(feedData.url);
      })
      .catch(e => {
        expect(e).to.eq(undefined);
      });
  });

  it('should get a feed by id', done => {
    const url = `/api/v1/feeds/${createdFeed.id}`;
    l.info(`ById Request ${url}`);
    request(Server)
      .get(url)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an.an('object')
          .that.has.property('name')
          .equal(createdFeed.name);
        done();
      })
      .catch(done);
  });
});
