import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function LoginForm({
  number,
  setNumber,
  setCreatingAccount,
  login,
}) {
  const [alertText, setAlertText] = useState("");
  const [enterPassword, setEnterPassword] = useState(false);
  const [password, setPassword] = useState("");

  function submitNumber(e) {
    setAlertText("");
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
          setAlertText(
            "This number is not permitted to sign up for the course checker."
          );
        } else {
          setAlertText("");
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
    login(password, (reason) => setAlertText(reason));
  }

  return (
    <div>
      {enterPassword ? (
        <form onSubmit={submitPassword}>
          <label>Password</label>
          <input
            type="text"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="btn"
            type="submit"
            value="Login"
            style={{ backgroundColor: "green" }}
          />
          <button
            className="btn"
            value="Back"
            style={{ backgroundColor: "gray" }}
            onClick={() => {
              setEnterPassword(false);
              setAlertText("");
            }}
          >
            Back
          </button>
        </form>
      ) : (
        <form onSubmit={submitNumber}>
          <label>Phone Number</label>
          <PhoneInput
            countryCodeEditable={false}
            prefix="+"
            onChange={(val) => setNumber("+" + val)}
            value={number}
            country="us"
            containerStyle={{
              minHeight: "30px",
              margin: "5px 10px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "auto",
            }}
            inputStyle={{
              //padding: "0px 5px",
              fontSize: "16px",
              fontFamily: "inherit",
              width: "auto",
            }}
            placeholder={"Enter phone number"}
          />
          <input
            className="btn"
            type="submit"
            value="Continue"
            style={{ backgroundColor: "green" }}
          />
        </form>
      )}

      {alertText ? <div className="error">{alertText}</div> : <></>}
    </div>
  );
}
