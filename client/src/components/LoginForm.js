import { useState } from "react";

export default function LoginForm({
  number,
  setNumber,
  setCreatingAccount,
  login,
}) {
  const [notAssociated, setNotAssociated] = useState(false);
  const [enterPassword, setEnterPassword] = useState(false);
  const [password, setPassword] = useState("");

  function submitNumber(e) {
    // prevent page from refreshing
    e.preventDefault();

    // find out whether there is already an account associated with this number
    fetch(`/hasAccount`, {
      method: "POST",
      body: JSON.stringify({ number: number }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.value === "no record") {
          setNotAssociated(true);
        } else {
          setNotAssociated(false);
          if (data.value) {
            setEnterPassword(true);
          } else {
            setCreatingAccount(true);
          }
        }
      });
    return false;
  }

  function submitPassword(e) {
    e.preventDefault();
    login(password);
  }

  return (
    <div>
      {enterPassword ? (
        <form onSubmit={submitPassword}>
          <label>Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" />
        </form>
      ) : (
        <form onSubmit={submitNumber}>
          <label>Phone Number</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <input type="submit" />
        </form>
      )}

      {notAssociated ? (
        <div className="error">
          This number is not permitted to sign up for the course checker
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
