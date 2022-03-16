const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Character = require('../lib/models/Onepiece');
const { insert } = require('../lib/models/Onepiece');

describe('backend-anyapi routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create an order', async () => {
    const res = await request(app)
      .post('/api/v1/onepiece')
      .send({ name: 'Monkey D. Luffy', crew: 'Straw Hats' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Monkey D. Luffy',
      crew: 'Straw Hats',
    });
  });

  it('Should be able to list characters', async () => {
    await insert({ name: 'Monkey D. Luffy', crew: 'Straw Hats' });

    const res = await request(app).get(`/api/v1/onepiece`);

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        name: 'Monkey D. Luffy',
        crew: 'Straw Hats',
      },
    ]);
  });

  it.only('Should be able to get character by id', async () => {
    const character = await insert({
      id: expect.any(String),
      name: 'Monkey D. Luffy',
      crew: 'Straw Hats',
    });
    const res = await request(app).get(`/api/v1/onepiece/${character.id}`);
    expect(res.body).toEqual(character);
  });
});
