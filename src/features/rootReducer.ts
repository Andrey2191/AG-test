import { combineReducers } from '@reduxjs/toolkit';
import tasksSlice from './tasks/tasksSlice';


const rootReducer = combineReducers({
    tasks: tasksSlice,
});

export default rootReducer;