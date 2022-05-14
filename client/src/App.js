import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import CourseAdder from "./components/CourseAdder";
import CreateAccountForm from "./components/CreateAccountForm";
import "./App.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [number, setNumber] = useState("");

  useEffect(() => {
    if (loggedIn === undefined) {
      fetch("/checkLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => setLoggedIn(data.value));
    }
  });

  function login(password) {
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({ number: number, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.value) {
          setLoggedIn(true);
        } else {
          console.log(data.reason);
        }
      });
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Beta Course Checker</h1>
      </div>
      {loggedIn === undefined ? (
        <></>
      ) : (
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
      )}
    </div>
  );
}
