import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';

const router = Router();

const taskStatusSchema = z.enum(['todo', 'in_progress', 'done']);
const taskPrioritySchema = z.enum(['low', 'medium', 'high']);

const createTaskSchema = z.object({
  title: z.string().trim().min(3, 'Title must contain at least 3 characters.').max(100),
  description: z.string().trim().max(500).optional().nullable(),
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional(),
});

const updateTaskSchema = z
  .object({
    title: z.string().trim().min(3).max(100).optional(),
    description: z.string().trim().max(500).optional().nullable(),
    status: taskStatusSchema.optional(),
    priority: taskPrioritySchema.optional(),
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: 'At least one field is required.',
  });

router.get('/', async (req, res, next) => {
  try {
    const status = req.query.status ? taskStatusSchema.parse(req.query.status) : undefined;
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';

    const tasks = await prisma.task.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
    });

    res.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payload = createTaskSchema.parse(req.body);

    const task = await prisma.task.create({
      data: {
        title: payload.title,
        description: payload.description || null,
        status: payload.status || 'todo',
        priority: payload.priority || 'medium',
      },
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const payload = updateTaskSchema.parse(req.body);

    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: payload,
    });

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.task.delete({
      where: { id: req.params.id },
    });

    res.json({
      success: true,
      message: 'Task deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
