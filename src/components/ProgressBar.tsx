import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { LinearProgress, Typography } from '@mui/material';
import { Task } from '../features/tasks/types';

const ProgressBar: React.FC = () => {
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const totalTasks = Array.isArray(tasks) ? tasks.length : 0;
  const completedTasks = Array.isArray(tasks) ? tasks.filter((task: Task) => task.completed).length : 0;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <div>
      <Typography variant="h6" gutterBottom>Total Progress</Typography>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="body2" align="right">{`${completedTasks}/${totalTasks} completed`}</Typography>
    </div>
  );
};

export default ProgressBar;