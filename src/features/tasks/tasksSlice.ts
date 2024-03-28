import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Task } from './types';
import { v4 as uuidv4 } from 'uuid';

const API = process.env.REACT_APP_API_KEY

interface TasksState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get<{ todos: Task[] }>(`${API}user/5`);
    return response.data.todos;
});

export const updateTaskCompletedStatus = createAsyncThunk(
    'tasks/updateTaskCompletedStatus',
    async ({ taskId, completed }: { taskId: number; completed: boolean }) => {
        const response = await axios.patch(`${API}${taskId}`, { completed });
        return response.data;
    }
);

const updateLocalTaskCompletedStatus = (state: TasksState, action: any) => {
    state.tasks = action.payload;
};

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId: number) => {
        const response = await axios.delete(`${API}${taskId}`);
        return response.data;
    }
);

const deleteLocalTask = (state: TasksState, action: any) => {
    state.tasks = action.payload;
};

export const addNewTask = createAsyncThunk(
    'tasks/addNewTask',
    async (taskTitle: string) => {
        const newTaskId = uuidv4();
        const response = await axios.post(`${API}add`, {
            id: newTaskId,
            todo: taskTitle,
            completed: false,
            userId: 5,
        });
        return { ...response.data, id: newTaskId };
    }
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch tasks';
            })
            .addCase(updateTaskCompletedStatus.fulfilled, (state, action) => {
                const updatedTask = action.payload;
                state.tasks = state.tasks.map(task =>
                    task.id === updatedTask.id ? updatedTask : task
                );
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const taskId = action.payload.id;
                state.tasks = state.tasks.filter(task => task.id !== taskId);
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                const newTask = { ...action.payload, isNew: true }; 
                state.tasks.push(newTask);
            })
            .addCase('UPDATE_TASKS', updateLocalTaskCompletedStatus)
            .addCase('DELETE_TASK', deleteLocalTask);
    },
});

export default tasksSlice.reducer;

