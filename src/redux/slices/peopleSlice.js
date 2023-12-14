import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const peopleSlice = createSlice({
  name: "peoples",
  initialState: {
    peoples: [],
    isLoading: false,
  },
  reducers: {
    // setPeoples: (state, action) => {
    //   state.peoples = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(setPeoples.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setPeoples.fulfilled, (state, action) => {
      state.isLoading = false;
      state.peoples = action.payload;
    });
    builder.addCase(setPeoples.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});
export const setPeoples = createAsyncThunk(
  "peoples/setPeoples",
  async (_, { dispatch, rejectWithValue }) => {
    const data = await fetch(
      "https://frontend-test-assignment-api.abz.agency/api/v1/users/"
    ).then((res) => res.json());
    return data.users;
  }
);
export default peopleSlice.reducer;
export const {} = peopleSlice.actions;
