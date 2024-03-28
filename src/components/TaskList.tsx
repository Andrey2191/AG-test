import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetchTasks, updateTaskCompletedStatus } from '../features/tasks/tasksSlice';
import { AppDispatch, RootState } from '../store';
import { Task } from '../features/tasks/types';
import { CircularProgress, IconButton, List, ListItem, ListItemText, Switch, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleToggleCompleted = (taskId: number, completed: boolean, isNew: boolean | undefined) => {
    if (isNew) {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: !completed } : task
      );
      dispatch({ type: 'UPDATE_TASKS', payload: updatedTasks });
    } else {
      dispatch(updateTaskCompletedStatus({ taskId, completed: !completed }));
    }
  };

  const handleDeleteTask = (taskId: number, isNew: boolean) => {
    if (isNew === true) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      dispatch({ type: 'DELETE_TASK', payload: updatedTasks });
    } else {
      dispatch(deleteTask(taskId));
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="body1" color="error">{error}</Typography>;
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return <Typography variant="body1">No tasks available</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" component="h2">Task List</Typography>
      <List>
        {tasks && tasks.map((task: Task, index) => (
          <ListItem key={index}>
            <ListItemText primary={task.todo} />
            <Switch
              checked={task.completed}
              onChange={() => handleToggleCompleted(task.id, task.completed, task.isNew || false)}
              inputProps={{ 'aria-label': 'toggle completed' }}
            />
            <IconButton onClick={() => handleDeleteTask(task.id, task.isNew || false)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TaskList;