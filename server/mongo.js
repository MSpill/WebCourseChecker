const { MongoClient, ServerApiVersion } = require("mongodb");
const MongoStore = require("connect-mongo");

// setup connections to database and session store
const url =
  process.env.MONGO_URL ||
  "mongodb+srv://cluster0.slxul.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority";
const credentials = __dirname + "/ssl/ca.pem";
const options = {
  sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1,
};

const client = new MongoClient(url, options);
exports.sessionstore = MongoStore.create({
  mongoUrl: url,
  mongoOptions: { ...options, dbName: "sessions" },
});

async function connect() {
  // Connect the client to the server
  await client.connect();
  // Establish and verify connection
  await client.db("admin").command({ ping: 1 });
  console.log("Connected successfully to database");
}
connect().catch((err) => console.log(err));

// functions to edit/read important information from the database
const accounts = client.db("testDB").collection("Accounts");
const courses = client.db("testDB").collection("Courses");
const numberdb = client.db("testDB").collection("Numbers");

exports.hasAccount = async function (number) {
  const record = await numberdb.findOne({ number: number });
  let result = "no record";
  if (record && record.hasAccount !== undefined) {
    result = record.hasAccount;
  }
  return result;
};

exports.setHasAccount = async function (number, value) {
  return await numberdb.updateOne(
    { number: number },
    { $set: { hasAccount: value } }
  );
};

exports.createAccount = async function (number, hash, major) {
  return await accounts.insertOne({ number: number, hash: hash, major: major });
};

exports.getAccount = async function (number) {
  return await accounts.findOne({ number: number });
};

exports.getCourses = async function (number) {
  return await courses.find({ numbers: number }).sort({ CRN: 1 }).toArray();
};

exports.addCourse = async function (number, crn, name) {
  const courseInDb = await courses.findOne({ CRN: crn });
  if (courseInDb) {
    let newNumbers = courseInDb.numbers.concat(number);
    courses.updateOne({ CRN: crn }, [{ $set: { numbers: newNumbers } }]);
  } else {
    courses.insertOne({
      CRN: crn,
      name: name,
      numbers: [number],
    });
  }
};

exports.removeCourse = async function (number, crn) {
  const courseInDb = await courses.findOne({ CRN: crn });
  if (courseInDb.numbers.length === 1) {
    courses.deleteOne({ CRN: crn });
  } else {
    let newNumbers = courseInDb.numbers.filter((val) => val !== number);
    courses.updateOne({ CRN: crn }, [{ $set: { numbers: newNumbers } }]);
  }
};
