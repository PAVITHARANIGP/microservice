const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');

describe('User Routes', () => {
  let token;

  before(async () => {
    await request(app).post('/api/auth/register').send({ username: 'testuser', password: 'password123' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password123' });
    token = res.body.token;
  });

  it('should get user profile', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', token);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('username', 'testuser');
  });
});
