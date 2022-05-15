const express = require("express");
const session = require("express-session");
const db = require("./mongo");
const passwords = require("./passwords");

// general setup
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "obungamungo",
    store: db.sessionstore,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// checks a given number-password pair against the database's salted hash
// if the credentials are correct, sets the user's session loggedIn to true
// returns whether the login succeeded as JSON
app.post("/login", (req, res) => {
  db.getAccount(req.body.number)
    .then((acct) => passwords.compare(req.body.password, acct.hash))
    .then((success) => {
      if (success) {
        req.session.loggedIn = true;
        res.json({ value: true });
      } else {
        res.json({ value: false, reason: "Incorrect password." });
      }
    })
    .catch((reason) => res.json({ value: false, reason: reason }));
});

app.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.loggedIn = false;
    res.json({ value: true });
  }
});

// returns whether the agent which makes the request is logged in by checking its session
// this is kinda necessary since the frontend is a single-page app
app.post("/checkLogin", (req, res) => {
  res.json({
    value:
      req.session !== undefined &&
      req.session.loggedIn !== undefined &&
      req.session.loggedIn,
  });
});

// returns whether the given number has a password associated with it yet
// returns a boolean or "no record" if the given number is not on the list of approved users
app.post("/hasAccount", (req, res) => {
  db.hasAccount(req.body.number).then((value) => {
    res.json({ value: value });
  });
});

// creates an account associated with the given phone number after checking that it doesn't already exist
// and is on the list of approved users
app.post("/createAccount", (req, res) => {
  db.hasAccount(req.body.number)
    .then((value) => {
      if (value === false) {
        return db.setHasAccount(req.body.number, true);
      } else {
        throw "Account already exists or is not permitted.";
      }
    })
    .then(() => passwords.saltAndHash(req.body.password))
    .then((hash) => db.createAccount(req.body.number, hash))
    .then(() => res.json({ value: true }))
    .catch((reason) => res.json({ value: false, reason: reason }));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
