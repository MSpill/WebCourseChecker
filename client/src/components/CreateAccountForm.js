import { useState } from "react";

export default function CreateAccountForm({ number, login }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertText, setAlertText] = useState("");

  function createAccount(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlertText("Passwords must match.");
      return;
    }
    fetch("/createAccount", {
      method: "POST",
      body: JSON.stringify({ number: number, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.status === 200) {
          throw "Internal server error";
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data.value) {
          // login
          setAlertText("Creating account succeeded");
        } else {
          throw data.reason;
        }
      })
      .catch((reason) => setAlertText(reason));
  }

  return (
    <div>
      <form onSubmit={createAccount}>
        <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          type="text"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input type="submit" />
      </form>
      {alertText === "" ? <></> : <div>{alertText}</div>}
    </div>
  );
}
