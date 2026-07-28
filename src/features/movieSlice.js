import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiInstance from "../api/apiInstance";

// 1. Fetch Popular Movies
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async (page = 1, { rejectWithValue }) => {
    try {
      const res = await apiInstance.get("/movie/popular", { params: { page } });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 2. Search Movies
export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      if (!query?.trim()) return { results: [], page: 1, total_pages: 1 };
      const res = await apiInstance.get("/search/movie", { params: { query, page } });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 3. Fetch Movie Details
export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await apiInstance.get(`/movie/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Initial State
const initialState = {
  movies: [],
  popularMovies: [],
  movieDetails: null,
  searchResults: [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  user: JSON.parse(localStorage.getItem("user")) || null,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.favorites.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((item) => item.id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.currentPage = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Popular Movies
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload.results || [];
        state.movies = action.payload.results || [];
        state.currentPage = action.payload.page || 1;
        state.totalPages = action.payload.total_pages || 1;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Search Movies
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.results || [];
        state.currentPage = action.payload.page || 1;
        state.totalPages = action.payload.total_pages || 1;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Movie Details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.movieDetails = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addFavorite, removeFavorite, login, logout, clearSearchResults } = movieSlice.actions;

export default movieSlice.reducer;
