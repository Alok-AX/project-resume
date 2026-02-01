import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

interface UIState {
  loading: boolean;
  modals: Record<string, boolean>;
  toasts: Toast[];
}

const initialState: UIState = {
  loading: false,
  modals: {},
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    openModal(state, action: PayloadAction<string>) {
      state.modals[action.payload] = true;
    },
    closeModal(state, action: PayloadAction<string>) {
      delete state.modals[action.payload];
    },
    addToast(state, action: PayloadAction<Toast>) {
      state.toasts.push(action.payload);
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
  },
});

export const { setLoading, openModal, closeModal, addToast, removeToast } = uiSlice.actions;
export default uiSlice.reducer;