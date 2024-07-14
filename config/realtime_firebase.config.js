// Import Admin SDK
// const { getDatabase } = require("firebase-admin/database");
const config = require("config");
const firebaseConfig = config.get("firebaseConfig");
const admin = require("firebase-admin");

// Fetch the service account key JSON file contents
const serviceAccount = require("../al-ulaa-dev-firebase-adminsdk-2nnel-efe273808a.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "https://al-ulaa-dev-default-rtdb.firebaseio.com",
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
// const db = admin.database();

// Get a database reference to our blog
const rtdb = admin.database();
// const ref = db.ref("server/saving-data/fireblog");

module.exports = { admin, rtdb };
