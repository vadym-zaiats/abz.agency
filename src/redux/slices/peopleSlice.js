import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setToken } from "./tokenSlice";

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    people: [],
    count: 6,
    page: 1,
    totalUsers: 0,
    dataIsLoading: true,
  },
  reducers: {
    setCount: (state, action) => {
      state.count =
        action.payload === undefined ? state.count + 6 : action.payload;
    },
    setPage: (state, action) => {
      state.page =
        action.payload === undefined ? state.page + 1 : action.payload;
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
  async ({ page }, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`
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
  async (formData, { dispatch, rejectWithValue, getState }) => {
    // const state = getState();
    // const token = state.tokenSlice.token;
    try {
      await dispatch(setToken());
      console.log(formData);
      // await fetch(
      //   "https://frontend-test-assignment-api.abz.agency/api/v1/users",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "multipart/form-data", Token: token },
      //     body: formData,
      //   }
      // )
      //   .then((res) => {
      //     if (res.ok) {
      //       return res.json();
      //     } else {
      //       console.error("Something went wrong");
      //     }
      //   })
      //   .then((data) => {
      //     console.log(data);
      //     if (data.success) {
      //       console.log(data);
      //     } else {
      //       console.log("proccess server errors");
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      dispatch(setCount(6));
      dispatch(setPage(1));
    } catch (error) {
      return rejectWithValue(error.massage);
    }
  }
);

export default peopleSlice.reducer;
export const { setCount, setPage } = peopleSlice.actions;
