import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import resumeReducer from './slices/resumeSlice';
import templatesReducer from './slices/templatesSlice';
import atsReducer from './slices/atsSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    resume: resumeReducer,
    templates: templatesReducer,
    ats: atsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;