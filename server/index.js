const express = require("express");
const session = require("express-session");
const db = require("./mongo");
const passwords = require("./passwords");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  session({
    secret: "obungamungo",
    store: db.sessionstore,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

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

app.post("/checkLogin", (req, res) => {
  res.json({
    value:
      req.session !== undefined &&
      req.session.loggedIn !== undefined &&
      req.session.loggedIn,
  });
});

app.post("/hasAccount", (req, res) => {
  db.hasAccount(req.body.number).then((value) => {
    res.json({ value: value });
  });
});

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
