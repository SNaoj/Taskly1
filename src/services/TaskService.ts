import { Preferences } from '@capacitor/preferences';
import { Task } from '../models/Task';

const STORAGE_KEY = 'tasks';

export const TaskService = {
  async saveTasks(tasks: Task[]): Promise<void> {
    try {
      await Preferences.set({
        key: STORAGE_KEY,
        value: JSON.stringify(tasks),
      });
    } catch (error) {
      console.error('Error al guardar en Storage', error);
    }
  },

  async getTasks(): Promise<Task[]> {
    try {
      const { value } = await Preferences.get({ key: STORAGE_KEY });
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error al recuperar del Storage', error);
      return [];
    }
  },

  async saveTask(newTask: Task): Promise<void> {
    const tasks = await this.getTasks();
    await this.saveTasks([...tasks, newTask]);
  },

  async updateTask(updatedTask: Task): Promise<void> {
    const tasks = await this.getTasks();
    const newTasks = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    await this.saveTasks(newTasks);
  },

  async deleteTask(id: string): Promise<void> {
    const tasks = await this.getTasks();
    const newTasks = tasks.filter(t => t.id !== id);
    await this.saveTasks(newTasks);
  }
};