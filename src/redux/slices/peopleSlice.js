import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const peopleSlice = createSlice({
  name: "peoples",
  initialState: {
    peoples: [],
    maxRes: 0,
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
    builder.addCase(setMaxResult.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setMaxResult.fulfilled, (state, action) => {
      state.isLoading = false;
      state.maxRes = action.payload;
    });
    builder.addCase(setMaxResult.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});
export const setPeoples = createAsyncThunk(
  "peoples/setPeoples",
  async ({ page }, { dispatch, rejectWithValue }) => {
    const data = await fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`
    ).then((res) => res.json());
    return data.users;
  }
);
export const setMaxResult = createAsyncThunk(
  "peoples/setMaxResult",
  async (_, { dispatch, rejectWithValue }) => {
    const data = await fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?count=100`
    ).then((res) => res.json());
    return data.users.length;
  }
);

// export const postCard = createAsyncThunk(
//   "peoples/postCard",
//   async ({data}, { dispatch, rejectWithValue }) => {
//     try {
//       await
//     } catch (error) {
//       console.log(error);
//     }
//     // const data = await fetch(
//     //   `https://frontend-test-assignment-api.abz.agency/api/v1/users?count=100`
//     // ).then((res) => res.json());
//     // return data.users.length;
//   }
// );

export default peopleSlice.reducer;
export const {} = peopleSlice.actions;
