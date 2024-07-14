const { db } = require("../../config/firebase.config");

/**
 * Get all Users Service
 */

async function getAllUsers() {
  const users = await db.collection("users");
  const data = await users.get();
  let response = [];
  let docs = data.docs;

  for (let doc of docs) {
    response.push(doc.data());
  }

  return response;
}

/**
 * get all admins' email address
 */
async function getAllAdminEmails() {
  admins = await getAllAdmins();
  emails = [];
  if (admins) {
    for (let admin of admins) {
      emails.push(admin.email);
    }
  }

  return emails;
}

/**
 *
 * @returns
 */
async function getAllAdmins() {
  const userRef = await db.collection("users");
  const snapshot = await userRef.where("role", "==", "admin").get();
  let admins = [];
  let docs = snapshot.docs;

  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  for (let doc of docs) {
    admins.push(doc.data());
  }

  return admins;
}

module.exports = {
  getAllUsers,
  getAllAdminEmails,
};
