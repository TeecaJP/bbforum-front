import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Header from "./header";
import TopPage from "./topPage";
import BoardPage from "./boardPage";
import Sidebar from "./sidebar";
import SearchBar from './searchBar.';
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
  const location = useLocation();

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.Email) {
        dispatch(resetOpenSignIn());
      }
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <Sidebar currentPath={location.pathname} />
      </Box>
      <Box sx={{ width: '70%' }}>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/board/:team" element={<BoardPage />} />
        </Routes>
      </Box>
      <Box>
        <SearchBar />
      </Box>
    </Box>
  );
}

function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default WrappedApp;