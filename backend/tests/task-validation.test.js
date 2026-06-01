import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

test('POST /api/tasks rejects invalid title before database write', async () => {
  const response = await request(app)
    .post('/api/tasks')
    .send({ title: 'x', priority: 'medium' })
    .expect(400);

  assert.equal(response.body.success, false);
  assert.equal(response.body.message, 'Validation error');
});
