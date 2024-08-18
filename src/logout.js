import React from "react";
import { useDispatch } from "react-redux";
import { resetIsUserSignIn } from "./features/authSlice";

function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetIsUserSignIn());
  };

  return <button onClick={handleLogout}>ログアウト</button>;
}

export default Logout;
