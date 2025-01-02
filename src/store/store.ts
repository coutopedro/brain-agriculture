import { configureStore } from '@reduxjs/toolkit';
import producerReducer from './features/producerSlice';

export const store = configureStore({
  reducer: {
    producers: producerReducer,
  },
});

// Tipo do estado global
export type RootState = ReturnType<typeof store.getState>;
