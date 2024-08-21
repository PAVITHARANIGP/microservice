const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'password123' });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message', 'User registered');
  });

  it('should login with correct credentials', async () => {
    await request(app).post('/api/auth/register').send({ username: 'testuser', password: 'password123' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password123' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });
});
