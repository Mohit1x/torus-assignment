import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { User } from "../types";
import { API_BASE_URL } from "../lib/utils";

// Define the shape of the auth state
interface FetchUserState {
  users: User[] | null;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: FetchUserState = {
  users: null,
  isLoading: false,
  error: null,
};

// Async thunk for fetching users
export const fetchUsersThunk = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      // API call to fetch users
      const response = await fetch(`${API_BASE_URL}/api/users`);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

// Create users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Any synchronous reducers can be added here
  },
  extraReducers: (builder) => {
    // Fetch users reducers
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload; // Correctly set the users data from the API response
        state.error = null;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.users = null;
        state.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;
