import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setToken } from "./tokenSlice";

const peoplelice = createSlice({
  name: "people",
  initialState: {
    people: [],
    totalUsers: 0,
    dataIsLoading: true,
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
  "people/setpeople",
  async ({ page }, { dispatch, rejectWithValue }) => {
    const data = await fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`
    ).then((res) => res.json());
    return data;
  }
);
export const postCard = createAsyncThunk(
  "people/postCard",
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

export default peoplelice.reducer;
export const {} = peoplelice.actions;
