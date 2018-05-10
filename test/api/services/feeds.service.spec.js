import * as chai from 'chai';
const chaiAsPromised = require('chai-as-promised');
import faker from 'faker';
import FeedsService from '../../../server/api/services/feeds.service';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('FeedsService', function () {
  let insertedFeed;
  before(() => {
    return FeedsService.create({
      name: faker.internet.domainName(),
      url: faker.internet.url(),
    }).then((feed) => {
      insertedFeed = feed;
    });
  });

  describe('#all', function () {
    it('returns an array', function () {
      return expect(FeedsService.all()).to.eventually.be.an('array');
    })
  });

  describe('#create', function() {
    it('returns the object with assigned id', function () {
      const input = {
        name: faker.internet.domainName(),
        url: faker.internet.url(),
      };
      return FeedsService.create(input).then(feed => {
        expect(feed.name).to.eql(input.name);
        expect(feed.url).to.eql(input.url);
        expect(feed._id).to.be;
      });
    });
  });

  describe('#byId', () => {
    it('returns the object by id', () => {
      return FeedsService.byId(insertedFeed._id).then((feed) => {
        expect(feed.name).to.eq(insertedFeed.name);
        expect(feed.url).to.eq(insertedFeed.url);
      });
    });
  });
});
