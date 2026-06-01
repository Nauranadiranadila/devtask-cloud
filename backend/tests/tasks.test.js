import test, { after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';
import { prisma } from '../src/db.js';

beforeEach(async () => {
  await prisma.task.deleteMany();
});

after(async () => {
  await prisma.$disconnect();
});

test('task CRUD flow works with PostgreSQL', async () => {
  const createResponse = await request(app)
    .post('/api/tasks')
    .send({
      title: 'Prepare final project submission',
      description: 'Deploy full-stack app to cloud and prepare README.',
      priority: 'high',
    })
    .expect(201);

  assert.equal(createResponse.body.success, true);
  assert.equal(createResponse.body.data.status, 'todo');

  const taskId = createResponse.body.data.id;

  const listResponse = await request(app).get('/api/tasks').expect(200);
  assert.equal(listResponse.body.data.length, 1);

  const updateResponse = await request(app)
    .patch(`/api/tasks/${taskId}`)
    .send({ status: 'done' })
    .expect(200);

  assert.equal(updateResponse.body.data.status, 'done');

  const deleteResponse = await request(app).delete(`/api/tasks/${taskId}`).expect(200);
  assert.equal(deleteResponse.body.success, true);
});
