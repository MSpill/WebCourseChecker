const { MongoClient, ServerApiVersion } = require("mongodb");

const url =
  "mongodb+srv://cluster0.slxul.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority";
const credentials = __dirname + "/ssl/ca.pem";

const client = new MongoClient(url, {
  sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  // Connect the client to the server
  await client.connect();
  // Establish and verify connection
  await client.db("admin").command({ ping: 1 });
  console.log("Connected successfully to server");
}

run().catch(console.dir);

exports.hasAccount = async function (number) {
  const numberdb = client.db("testDB").collection("Numbers");
  const record = await numberdb.findOne({ number: number });
  let result = "no record";
  if (record && record.hasAccount !== undefined) {
    result = record.hasAccount;
  }
  return result;
};

exports.setHasAccount = async function (number, value) {
  const numberdb = client.db("testDB").collection("Numbers");
  return await numberdb.updateOne(
    { number: number },
    { $set: { hasAccount: value } }
  );
};

exports.createAccount = async function (number, hash) {
  const accounts = client.db("testDB").collection("Accounts");
  return await accounts.insertOne({ number: number, hash: hash });
};
