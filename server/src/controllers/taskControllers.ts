import chalk from 'chalk';
import type { Request, Response } from 'express';
import type { ITask } from '../models/task';
import { Task } from '../models/task';
import { error } from 'node:console';
const { red } = chalk;

const getAllTasks = async (_: Request, res: Response) => {
  try {
    const tasks: ITask[] = await Task.find();
    if (!tasks.length)
      return res
        .status(404)
        .json({ success: false, message: 'No tasks found' });
    res.status(200).json({
      success: true,
      message: 'All tasks fetched successfully',
      data: tasks,
    });
  } catch (err) {
    error(red(err));
    res.status(500).json({
      success: false,
      message: 'Something went wrong, Try again',
    });
  }
};

const getTaskById = async (
  req: Request<{ id: string }, unknown, ITask, unknown>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const task: ITask | null = await Task.findById(id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: 'Task not found' });
    res.status(200).json({
      success: true,
      message: 'Task fetched successfully',
      data: task,
    });
  } catch (err) {
    error(red(err));
    res.status(500).json({
      success: false,
      message: 'Something went wrong, Try again',
    });
  }
};

const createTask = async (
  req: Request<unknown, unknown, ITask, unknown>,
  res: Response
) => {
  try {
    const { taskName, description } = req.body;
    const newTask = await Task.create({ taskName, description });
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask,
    });
  } catch (err) {
    error(red(err));
    res.status(500).json({
      success: false,
      message: 'Something went wrong, Try again',
    });
  }
};

const updateTask = async (
  req: Request<{ id: string }, unknown, ITask, unknown>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { taskName, description } = req.body;
    const task: ITask | null = await Task.findByIdAndUpdate(id, {
      taskName,
      description,
    });
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: 'Task not found' });
    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (err) {
    error(red(err));
    res.status(500).json({
      success: false,
      message: 'Something went wrong, Try again',
    });
  }
};

const deleteTask = async (
  req: Request<{ id: string }, unknown, ITask, unknown>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const task: ITask | null = await Task.findByIdAndDelete(id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: 'Task not found' });
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: task,
    });
  } catch (err) {
    error(red(err));
    res.status(500).json({
      success: false,
      message: 'Something went wrong, Try again',
    });
  }
};

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
