const config = require("config");
// const firebaseConfig = config.get("firebaseConfig");
const admin = require("firebase-admin");
// const admin = require("firebase");

// Fetch the service account key JSON file contents
const serviceAccount = require("../serviceAccount.json");

// Initialize the default app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "https://al-ulaa-dev.firebaseio.com",
});

// Initialize the second app with a service account, granting admin privileges
admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
    // The database URL depends on the location of the database
    databaseURL: "https://al-ulaa-dev-real-time.firebaseio.com",
  },
  "real-time-app-rquest"
);

// Initialize the second app with a service account, granting admin privileges
admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
    // The database URL depends on the location of the database
    databaseURL: "https://al-ulaa-dev-real-time.firebaseio.com",
    // databaseURL: "https://al-ulaa-dev.firebaseio.com",
  },
  "real-time-app-subscribe"
);

// As an admin, the app has access to read and write all data, regardless of Security Rules
// const db = admin.database();
const db = admin.firestore();

const realTimeAppReq = admin.app("real-time-app-rquest");
const rtdbr = realTimeAppReq.database();

const realTimeAppSubs = admin.app("real-time-app-subscribe");
const rtdbs = realTimeAppSubs.database();

module.exports = { admin, db, rtdbr, rtdbs };
