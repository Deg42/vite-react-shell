import { Request, Response, Router } from 'express';
import Task from '../models/Task';

const router = Router();

router.get('/api/kanban/tasks', async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

router.post('/api/kanban/tasks', async (req: Request, res: Response) => {
    const { title, status, checks } = req.body;

    try {
        const newTask = new Task({ title, status, checks });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

router.put('/api/kanban/tasks/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedTask = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/api/kanban/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

