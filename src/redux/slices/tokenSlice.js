import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: null,
    success: false,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(setToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.success = action.payload.success;
    });
    builder.addCase(setToken.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const setToken = createAsyncThunk(
  "token/setToken",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/token`
      );
      if (!res.ok) {
        throw new Error("Server error");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.massage);
    }
  }
);

export default tokenSlice.reducer;
