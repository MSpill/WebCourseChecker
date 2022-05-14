import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import CourseAdder from "./components/CourseAdder";
import CreateAccountForm from "./components/CreateAccountForm";
import "./App.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [number, setNumber] = useState("");

  function login(password) {
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({ number: number, password: password }),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Beta Course Checker</h1>
      </div>
      <div className="contents">
        {loggedIn ? (
          <CourseAdder />
        ) : creatingAccount ? (
          <CreateAccountForm
            number={number}
            login={login}
            setCreatingAccount={setCreatingAccount}
          />
        ) : (
          <LoginForm
            number={number}
            login={login}
            setNumber={setNumber}
            setCreatingAccount={setCreatingAccount}
          />
        )}
      </div>
    </div>
  );
}
