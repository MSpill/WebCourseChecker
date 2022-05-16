import { useState, useEffect } from "react";

export default function CreateAccountForm({ number, login }) {
  const [major, setMajor] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertText, setAlertText] = useState("");
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    fetch("majors.txt")
      .then((val) => val.text())
      .then((data) => {
        const newMajors = data.split("\n").map((str) => str.trimEnd());
        setMajors(newMajors);
        setMajor(newMajors[0]);
      });
  }, []);

  function createAccount(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlertText("Passwords must match.");
      return;
    }
    fetch("/createAccount", {
      method: "POST",
      body: JSON.stringify({
        number: number,
        password: password,
        major: major,
      }),
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
          login(password);
          setAlertText("Creating account succeeded");
        } else {
          throw data.reason;
        }
      })
      .catch((reason) => setAlertText(reason));
  }

  return (
    <div>
      <h2 style={{ marginBottom: "0px" }}>Create Account</h2>
      <p style={{ marginBottom: "20px" }}>
        This information will be used to access the system from now on.
      </p>
      <form onSubmit={createAccount}>
        <label>Major</label>
        <select
          className="form-input"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        >
          {majors.map((val, index) => (
            <option key={index}>{val}</option>
          ))}
        </select>
        <label>Password</label>
        <input
          type="text"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          type="text"
          className="form-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          className="btn"
          style={{ backgroundColor: "green" }}
          type="submit"
        />
      </form>
      {alertText ? <div className="error">{alertText}</div> : <></>}
    </div>
  );
}
