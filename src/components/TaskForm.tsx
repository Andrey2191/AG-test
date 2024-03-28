import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';
import { addNewTask } from '../features/tasks/tasksSlice';

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    dispatch(addNewTask(taskTitle) as any);
    setTaskTitle('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };
  return (
    <div>
      <Typography variant="h5" component="h2">Task Form</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Task Title" variant="outlined" fullWidth value={taskTitle} onChange={handleChange} />
        <Button variant="contained" color="primary" type="submit">Add Task</Button>
      </form>
    </div>
  );
};

export default TaskForm;