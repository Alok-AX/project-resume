import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { profileService } from '../../services/profile.service';

interface ProfileState {
  profile: {
    fullName: string;
    email: string;
    professionalHeadline: string;
    location: string;
    linkedinUrl: string;
    bio: string;
    profilePicture: string;
  } | null;
  loading: boolean;
  error: string | null;
  updateLoading: boolean;
  updateError: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
};

// Async thunks
export const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileService.getProfile();
      return response.data.data;
    } catch (error) {
      const err = error as { message?: string; errors?: string[] };
      const errorMessage = err.message || (err.errors && err.errors[0]) || 'Failed to fetch profile';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (profileData: Partial<ProfileState['profile']>, { rejectWithValue }) => {
    try {
      const response = await profileService.updateProfile(profileData);
      return response.data.data;
    } catch (error) {
      const err = error as { message?: string; errors?: string[] };
      const errorMessage = err.message || (err.errors && err.errors[0]) || 'Failed to update profile';
      console.log('Profile update error:', err);
      console.log('Error message to show:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError(state) {
      state.error = null;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Profile
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch profile';
      });

    // Update Profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.profile = action.payload;
        state.updateError = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload as string || 'Failed to update profile';
      });
  },
});

export const { clearProfileError } = profileSlice.actions;
export default profileSlice.reducer;
