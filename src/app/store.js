import { configureStore } from "@reduxjs/toolkit";
import movieReducer from '../features/movieSlice.js';

const store = configureStore({
    reducer: {
        movies: movieReducer
    }
});

export default store;
