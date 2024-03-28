import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ProgressBar from './components/ProgressBar';

function App() {
  return (
    <div className="App">
      <ProgressBar />
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
