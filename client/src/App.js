import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import CourseAdder from "./components/CourseAdder";
import CreateAccountForm from "./components/CreateAccountForm";
import "./App.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [number, setNumber] = useState("");

  // check whether the session is logged in on page load
  useEffect(() => {
    fetch("/checkLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setLoggedIn(data.value));
  }, []);

  function login(password, errorCallback) {
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({ number: number, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.value) {
          setLoggedIn(true);
        } else {
          errorCallback(data.reason);
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
            <CourseAdder setLoggedIn={setLoggedIn} />
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
