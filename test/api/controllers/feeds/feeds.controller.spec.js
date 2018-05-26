import chai from 'chai';
import faker from 'faker';
import mocha from 'mocha';
import request from 'supertest';
import Server from '../../../../server';
import FeedsDatabase from '../../../../server/api/services/feeds.db.service';
import l from '../../../../server/common/logger';

const { expect } = chai;

mocha.describe('FeedsController', () => {
  let createdFeed;
  mocha.before(() => {
    return FeedsDatabase.deleteAll().then(() => {
      return FeedsDatabase.insert({
        name: faker.internet.domainName(),
        url: faker.internet.url(),
      }).then(f => {
        createdFeed = f;
      });
    });
  });

  mocha.it('should get all feeds', () => {
    return request(Server)
      .get('/api/v1/feeds')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array').lengthOf(1);
      });
  });

  mocha.it('should add a new feed', () => {
    const feedData = {
      name: faker.internet.domainName(),
      url: faker.internet.url(),
    };
    return request(Server)
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
      });
  });

  mocha.xit('should get a feed by id', () => {
    l.debug(__filename, 'createdFeed', createdFeed);
    const objectId = createdFeed.id;
    const id = objectId.toString();
    // const path = '/api/v1/feeds/' + id; // ${createdFeed._id};
    const path = `/api/v1/feeds/${id}`;
    l.debug(__filename, 'ById Request', path, typeof path, typeof objectId, typeof id);
    return request(Server)
      .get(path)
      .expect(200)
      // .expect('Content-Type', /json/)
      .then(r => {
        l.debug('request response', r.body);
        expect(r.body)
          .to.be.an.an('object')
          .that.has.property('name')
          .equal(createdFeed.name);
      });
  });
});
