const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-anyapi routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('controller should would', async () => {
    const res = await request(app)
      .post('/api/v1/onepiece')
      .send({ name: 'Monkey D. Luffy', crew: 'Straw Hats' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Monkey D. Luffy',
      crew: 'Straw Hats',
    });
  });
});
