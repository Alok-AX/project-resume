import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resumeService } from '../../services/resume.service';

interface Resume {
  _id: string;
  user: string;
  title: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedin?: string;
    profilePhoto?: string;
  };
  summary?: string;
  experiences: any[];
  education: any[];
  projects: any[];
  skills: string[];
  templateId?: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  lastModified: string;
}

interface ResumeState {
  resumes: Resume[];
  currentResume: Resume | null;
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

const initialState: ResumeState = {
  resumes: [],
  currentResume: null,
  loading: false,
  error: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

// Async thunks
export const createResume = createAsyncThunk(
  'resume/create',
  async (resumeData: any, { rejectWithValue }) => {
    try {
      const response = await resumeService.createResume(resumeData);
      return response.data.data;
    } catch (error: any) {
      const err = error as { message?: string; errors?: string[] };
      const errorMessage = err.message || (err.errors && err.errors[0]) || 'Failed to create resume';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchResumes = createAsyncThunk(
  'resume/fetchAll',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await resumeService.getResumes(params);
      return response.data.data;
    } catch (error: any) {
      const err = error as { message?: string; errors?: string[] };
      const errorMessage = err.message || (err.errors && err.errors[0]) || 'Failed to fetch resumes';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchResumeById = createAsyncThunk(
  'resume/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await resumeService.getResumeById(id);
      return response.data.data;
    } catch (error: any) {
      const err = error as { message?: string; errors?: string[] };
      const errorMessage = err.message || (err.errors && err.errors[0]) || 'Failed to fetch resume';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateResume = createAsyncThunk(
  'resume/update',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await resumeService.updateResume(id, data);
      return response.data.data;
    } catch (error: any) {
      const err = error as { message?: string; errors?: string[] };
      const errorMessage = err.message || (err.errors && err.errors[0]) || 'Failed to update resume';
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteResume = createAsyncThunk(
  'resume/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await resumeService.deleteResume(id);
      return id;
    } catch (error: any) {
      const err = error as { message?: string; errors?: string[] };
      const errorMessage = err.message || (err.errors && err.errors[0]) || 'Failed to delete resume';
      return rejectWithValue(errorMessage);
    }
  }
);

export const duplicateResume = createAsyncThunk(
  'resume/duplicate',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await resumeService.duplicateResume(id);
      return response.data.data;
    } catch (error: any) {
      const err = error as { message?: string; errors?: string[] };
      const errorMessage = err.message || (err.errors && err.errors[0]) || 'Failed to duplicate resume';
      return rejectWithValue(errorMessage);
    }
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setCurrentResume(state, action) {
      state.currentResume = action.payload;
    },
    clearCurrentResume(state) {
      state.currentResume = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Resume
    builder
      .addCase(createResume.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createResume.fulfilled, (state, action) => {
        state.createLoading = false;
        state.currentResume = action.payload;
        state.resumes.unshift(action.payload);
      })
      .addCase(createResume.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload as string;
      });

    // Fetch All Resumes
    builder
      .addCase(fetchResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = action.payload;
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Single Resume
    builder
      .addCase(fetchResumeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResume = action.payload;
      })
      .addCase(fetchResumeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Resume
    builder
      .addCase(updateResume.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateResume.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.currentResume = action.payload;
        const index = state.resumes.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.resumes[index] = action.payload;
        }
      })
      .addCase(updateResume.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload as string;
      });

    // Delete Resume
    builder
      .addCase(deleteResume.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.resumes = state.resumes.filter(r => r._id !== action.payload);
        if (state.currentResume?._id === action.payload) {
          state.currentResume = null;
        }
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload as string;
      });

    // Duplicate Resume
    builder
      .addCase(duplicateResume.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(duplicateResume.fulfilled, (state, action) => {
        state.createLoading = false;
        state.resumes.unshift(action.payload);
      })
      .addCase(duplicateResume.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentResume, clearCurrentResume, clearError } = resumeSlice.actions;
export default resumeSlice.reducer;