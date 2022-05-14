const express = require("express");
const db = require("./mongo");
const passwords = require("./passwords");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

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
