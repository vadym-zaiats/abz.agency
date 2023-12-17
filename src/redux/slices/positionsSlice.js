import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const positionsSlice = createSlice({
  name: "positions",
  initialState: {
    positions: null,
    success: false,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(setPositions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setPositions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.positions = action.payload.positions;
      state.success = action.payload.success;
    });
    builder.addCase(setPositions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const setPositions = createAsyncThunk(
  "positions/setPositions",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/positions`
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

export default positionsSlice.reducer;
