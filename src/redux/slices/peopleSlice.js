import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setToken } from "./tokenSlice";

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    people: [],
    count: 6,
    totalUsers: 0,
    dataIsLoading: true,
  },
  reducers: {
    setCount: (state, action) => {
      state.count =
        action.payload === undefined ? state.count + 6 : action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setPeople.pending, (state) => {
      state.dataIsLoading = true;
    });
    builder.addCase(setPeople.fulfilled, (state, action) => {
      state.people = action.payload.users;
      state.totalUsers = action.payload.total_users;
      state.dataIsLoading = false;
    });
    builder.addCase(setPeople.rejected, (state, action) => {
      state.dataIsLoading = false;
      state.error = action.error;
    });
  },
});
export const setPeople = createAsyncThunk(
  "people/setPeople",
  async ({ count }, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?count=${count}`
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
export const postCard = createAsyncThunk(
  "people/postCard",
  async ({ validFormData, token }, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://frontend-test-assignment-api.abz.agency/api/v1/users",
        {
          method: "POST",
          headers: { Token: token },
          body: validFormData,
        }
      );
      if (!res.ok) {
        throw new Error("Server error");
      }
      const data = await res.json();
      dispatch(setCount(6));
      return data;
    } catch (error) {
      return rejectWithValue(error.massage);
    }
  }
);

export default peopleSlice.reducer;
export const { setCount } = peopleSlice.actions;
