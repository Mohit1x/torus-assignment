import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../lib/utils";

// Define the shape of the auth state
interface deleteUserState {
  isDeleted: boolean;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: deleteUserState = {
  isDeleted: false,
  isLoading: false,
  error: null,
};

// Async thunk for login
export const deleteUserThunk = createAsyncThunk(
  "deleteUser",
  async (credentials: { id: number }, { rejectWithValue }) => {
    try {
      // Simulated login API call
      const response = await fetch(
        `${API_BASE_URL}/api/users/${credentials.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
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

// Create auth slice
const deleteUserSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {
    // Any synchronous reducers can be added here
  },
  extraReducers: (builder) => {
    // Login reducers
    builder
      .addCase(deleteUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isDeleted = true;
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.error = action.payload as string;
      });
    // Logout reducers
    //   .addCase(logoutThunk.fulfilled, (state) => {
    //     state.isLoggedIn = false;
    //   });
  },
});

export default deleteUserSlice.reducer;
