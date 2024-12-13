import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userFilteredValueState {
  userStatus: {
    activeUser: number;
    totalUsers: number;
    deletedUser: number;
    inActiveUser: number;
  };
}

const initialState: userFilteredValueState = {
  userStatus: {
    activeUser: 0,
    totalUsers: 0,
    deletedUser: 0,
    inActiveUser: 0,
  },
};

const userFilteredValueSlice = createSlice({
  name: "filtered",
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<number>) => {
      state.userStatus.activeUser = action.payload;
    },
    setTotalUser: (state, action: PayloadAction<number>) => {
      state.userStatus.totalUsers = action.payload;
    },
    setDeletedUser: (state, action: PayloadAction<number>) => {
      state.userStatus.deletedUser = action.payload;
    },
    setInActiveUser: (state, action: PayloadAction<number>) => {
      state.userStatus.inActiveUser = action.payload;
    },
  },
});

export const { setActiveUser, setTotalUser, setDeletedUser, setInActiveUser } =
  userFilteredValueSlice.actions;
export default userFilteredValueSlice.reducer;
