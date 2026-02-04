import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import resumeReducer from './slices/resumeSlice';
import templatesReducer from './slices/templatesSlice';
import atsReducer from './slices/atsSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    resume: resumeReducer,
    templates: templatesReducer,
    ats: atsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;