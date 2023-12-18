import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setToken } from "./tokenSlice";

const peopleSlice = createSlice({
  name: "peoples",
  initialState: {
    peoples: [],
    totalUsers: 0,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(setPeoples.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setPeoples.fulfilled, (state, action) => {
      state.peoples = action.payload.users;
      state.totalUsers = action.payload.total_users;
      state.isLoading = false;
    });
    builder.addCase(setPeoples.rejected, (state, action) => {
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
    return data;
  }
);
export const postCard = createAsyncThunk(
  "peoples/postCard",
  async (formData, { dispatch, rejectWithValue, getState }) => {
    // const state = getState();
    // const token = state.tokenSlice.token;
    try {
      const res = await dispatch(setToken());
      console.log(formData);
      // try {
      //   fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: token,
      //     },
      //     body: JSON.stringify({
      //       name,
      //       email,
      //       phone,
      //       position,
      //       photo,
      //     }),
      //   })
      //     .then((res) => {
      //       if (res.ok) {
      //         //     renderAdminPage();
      //         //     return res.text();
      //       } else {
      //         //     renderWrongPage();
      //         //     console.log("Невірний логін або пароль");
      //       }
      //     })
      //     .then((data) => {
      //       console.log("Server responce:", data);
      //     });
      // } catch (error) {
      //   console.error("Error:", error);
      // }
    } catch (error) {
      return rejectWithValue(error.massage);
    }
  }
);

export default peopleSlice.reducer;
export const {} = peopleSlice.actions;
