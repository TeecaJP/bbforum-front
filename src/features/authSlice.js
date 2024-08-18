import { createSlice } from "@reduxjs/toolkit";

const removeLocalStorage = () => {
  const keys = [
    "Email", "Name", "Image", "Type", "Location", "Twitter", 
    "Instagram", "Facebook", "Website", "Birthday", "Description"
  ];
  keys.forEach(key => localStorage.removeItem(key));
};

const initialState = {
  openSignIn: false,
  openSignUp: false,
  openIsLoginError: false,
  isLoadingAuth: false,
  loginState: {
    isUserSignIn: Boolean(localStorage.getItem("Email")),
  },
  myprofile: {
    Email: localStorage.getItem("Email") || "",
    ID: "",
    Name: localStorage.getItem("Name") || "Anonymous",
    Image: localStorage.getItem("Image") || "",
    Type: localStorage.getItem("Type") || "person",
    Location: localStorage.getItem("Location") || "",
    Twitter: localStorage.getItem("Twitter") || "",
    Instagram: localStorage.getItem("Instagram") || "",
    Facebook: localStorage.getItem("Facebook") || "",
    Website: localStorage.getItem("Website") || "",
    Birthday: localStorage.getItem("Birthday") || "",
    Description: localStorage.getItem("Description") || "",
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchCredStart: (state) => {
      state.isLoadingAuth = true;
    },
    fetchCredEnd: (state) => {
      state.isLoadingAuth = false;
    },
    setOpenSignIn: (state) => {
      state.openSignIn = true;
    },
    resetOpenSignIn: (state) => {
      state.openSignIn = false;
    },
    setOpenSignUp: (state) => {
      state.openSignUp = true;
    },
    resetOpenSignUp: (state) => {
      state.openSignUp = false;
    },
    setOpenIsLoginError: (state) => {
      state.openIsLoginError = true;
    },
    resetOpenIsLoginError: (state) => {
      state.openIsLoginError = false;
    },
    setIsUserSignIn: (state) => {
      state.loginState.isUserSignIn = true;
    },
    resetIsUserSignIn: (state) => {
      state.loginState.isUserSignIn = false;
      removeLocalStorage();
    },
  },
});

export const {
  fetchCredStart,
  fetchCredEnd,
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
  setOpenIsLoginError,
  resetOpenIsLoginError,
  setIsUserSignIn,
  resetIsUserSignIn,
} = authSlice.actions;

export const selectIsLoadingAuth = (state) => state.auth.isLoadingAuth;
export const selectIsUserSignIn = (state) => state.auth.loginState.isUserSignIn;
export const selectOpenSignIn = (state) => state.auth.openSignIn;
export const selectOpenSignUp = (state) => state.auth.openSignUp;
export const selectOpenIsLoginError = (state) => state.auth.openIsLoginError;
export const selectProfile = (state) => state.auth.myprofile;

export default authSlice.reducer;