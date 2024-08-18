import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Header from "./header";
import TopPage from "./topPage";
import BoardPage from "./boardPage";
import Sidebar from "./sidebar";
import Login from "./login"; 
import Box from "@mui/material/Box";
import {
  resetOpenSignIn,
  selectProfile,
  selectIsUserSignIn,
} from "./features/authSlice";

function App() {
  const dispatch = useDispatch();
  const userProf = useSelector(selectProfile);
  const isUserSignIn = useSelector(selectIsUserSignIn);

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.Email) {
        dispatch(resetOpenSignIn());
      }
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/board/:team" element={<BoardPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;