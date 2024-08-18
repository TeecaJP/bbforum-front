import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsUserSignIn } from "./features/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    localStorage.setItem("Email", email);
    dispatch(setIsUserSignIn());
    setEmail("");
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
}

export default Login;
