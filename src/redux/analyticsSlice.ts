import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { analyticsData } from "../types";
import { API_BASE_URL } from "../lib/utils";

// Define the shape of the auth state
interface FetchUserState {
  analyticsData: analyticsData | null;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: FetchUserState = {
  analyticsData: null,
  isLoading: false,
  error: null,
};

// Async thunk for fetching users
export const fetchAnalyticsData = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      // API call to fetch users
      const response = await fetch(`${API_BASE_URL}/api/analytics`);

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
const analyticsDataSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    // Any synchronous reducers can be added here
  },
  extraReducers: (builder) => {
    // Fetch users reducers
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.analyticsData = action.payload; // Correctly set the users data from the API response
        state.error = null;
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.isLoading = false;
        state.analyticsData = null;
        state.error = action.payload as string;
      });
  },
});

export default analyticsDataSlice.reducer;
