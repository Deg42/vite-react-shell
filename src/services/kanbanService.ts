import axios from 'axios';
import { Task } from '../components/Kanban/types'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

if (!BACKEND_URL) {
  throw new Error('VITE_BACKEND_URL is not defined');
}

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/kanban/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const addTask = async (title: string): Promise<Task> => {
  try {
    const newTask = { title, status: 0, checks: [] };
    const response = await axios.post(`${BACKEND_URL}/api/kanban/tasks`, newTask);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const updateTask = async (taskId: string, updatedTask: Task): Promise<void> => {
  try {
    await axios.put(`${BACKEND_URL}/api/kanban/tasks/${taskId}`, updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const createCheck = async (taskId: string, checkData: { label: string; done: boolean }) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/kanban/tasks/${taskId}/checks`, checkData);

    return response.data;
  } catch (error) {
    console.error('Error creating check:', error);
    throw error;
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await axios.delete(`${BACKEND_URL}/api/kanban/tasks/${taskId}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
