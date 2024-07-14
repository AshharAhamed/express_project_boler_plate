const functions = require("firebase-functions");
const { db, rtdb, rtdbs } = require("../../../config/firebase.config");
// const restaurantService = require("../../services/restaurants.service");
// const http = require("http").createServer(app);
// const io = require("socket.io")(http);
const config = require("config");
let freeFoodUserMinSal = config.get("free_food_user_min_salary");

// const recipientsService = require("../../services/recipients.service");

/**
 * Start All listeners
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
// function startListener(/* req, res, next */) {
//   nearbyOutletRequestEventListnerFirestore();
//   // recipientApprovalRequestEventListnerFirestore();
//   // userApprovalForRecipient();
//   console.log("Listening to firebase events...");
// }

/**
 * start Nearby outlet request listener
 */
/* function nearbyOutletRequestEventListner() {
  const refOutletRequet = rtdbs.ref("outlets/outlet-request");
  refOutletRequet.on("child_added", (snapshot) => {
    const newChildKey = snapshot.key;
    // console.log("New child added with id:", newChildKey);
    const data = snapshot.val();
    // console.log("Outlet request added:", data);
    const result = processNearRestaurantData(newChildKey, data);
    // console.log("Restaurent Result:", result);
  });
} */

/**
 * start Nearby outlet request listener Firestore
 */
// function nearbyOutletRequestEventListnerFirestore() {
//   const refOutletRequet = db.collection("outlet_request");
//   // console.log("DEBUG>> EVENT listneing from firebase firestore =====>");
//   const observer = refOutletRequet.onSnapshot(
//     (snapshots) => {
//       snapshots.docChanges().forEach((change) => {
//         if (change.type === "added" || change.type === "modified") {
//           let request = change.doc.data();
//           // console.log("New Request Added Or Modified: ", request);

//           const newChildKey = request.uuid;
//           // console.log("New child added with id:", newChildKey);

//           const result = processNearRestaurantData(newChildKey, request);
//           // console.log("Restaurent Result:", result);
//         }
//         /*  if (change.type === "modified") {
//           console.log("Modified city: ", change.doc.data());
//         }
//         if (change.type === "removed") {
//           console.log("Removed city: ", change.doc.data());
//         } */
//       });

//       // console.log("Outlet request added:", data);
//     },
//     (err) => {
//       console.error(`Encountered error: ${err}`);
//     }
//   );
// }

// async function processNearRestaurantData(newChildKey, data) {
//   // console.log("DEBUG>> Restaurant process");
//   const userLat = data.latitude;
//   const userLongt = data.longitude;
//   const datas = await restaurantService.getAllNearByRestaurants(
//     newChildKey,
//     userLat,
//     userLongt
//   );
//   const result = {
//     status: "success",
//     message: "All nearby restaurents",
//     data: datas,
//   };

//   return result;
// }

/**
 * start recipient approval request listener
 */
/* function recipientApprovalRequestEventListner() {
  const refRecipientApprovalRequet = rtdbs.ref(
    "recipients/recipient-approval-request"
  );
  refRecipientApprovalRequet.on("child_added", (snapshot) => {
    const newChildKey = snapshot.key;
    console.log("New child added with id:", newChildKey);
    const data = snapshot.val();

    console.log("recipient request added Obj:", data);
    const result = processRecipientApproval(newChildKey, data);
    console.log("Recipipent APproval Result:", result);
  });
} */

/**
 * start recipient approval request listener firestore
 */
// function recipientApprovalRequestEventListnerFirestore() {
//   const refRecipientApprovalRequet = db.collection(
//     "recipient_approval_request"
//   );

//   // console.log("DEBUG>> EVENT listneing from firebase firestore =====>");
//   const observer = refRecipientApprovalRequet.onSnapshot(
//     (snapshots) => {
//       snapshots.docChanges().forEach((change) => {
//         if (change.type === "added" || change.type === "modified") {
//           let request = change.doc.data();
//           // console.log("New Request Added Or Modified: ", request);

//           const newChildKey = request.uuid;
//           // console.log("New child added with id:", newChildKey);
//           const data = request;

//           // console.log("recipient request added Obj:", data);
//           const result = processRecipientApproval(newChildKey, data);
//           // console.log("Recipipent APproval Result:", result);
//         }
//       });

//       // console.log("Outlet request added:", data);
//     },
//     (err) => {
//       console.error(`Encountered error: ${err}`);
//     }
//   );
//   // -----------------------------------------------------
//   /* const refRecipientApprovalRequet = rtdbs.ref(
//     "recipients/recipient-approval-request"
//   );
//   refRecipientApprovalRequet.on("child_added", (snapshot) => {
//     const newChildKey = snapshot.key;
//     console.log("New child added with id:", newChildKey);
//     const data = snapshot.val();

//     console.log("recipient request added Obj:", data);
//     const result = processRecipientApproval(newChildKey, data);
//     console.log("Recipipent APproval Result:", result);
//   }); */
// }

// async function processRecipientApproval(newChildKey, data) {
//   const username = data.username;
//   const datas = await recipientsService.setRecipientApproved(
//     newChildKey,
//     username
//   );
//   const result = {
//     status: "SuCCESS",
//     message: "Approved recipient",
//     data: datas,
//   };

//   return result;
// }

/**
 * recipient approval request listener firestore from user
 */
// function userApprovalForRecipient() {
//   const refRecipientApprovalRequet = db.collection("users");

//   const observer = refRecipientApprovalRequet.onSnapshot(
//     (snapshots) => {
//       snapshots.docChanges().forEach((change) => {
//         if (/* change.type === "added" ||  */ change.type === "modified") {
//           // console.log("Modified Event triggered to free food user");
//           let doc = change.doc;
//           let request = change.doc.data();

//           const newChildKey = doc.id;
//           // console.log("UUID => ", newChildKey);
//           const data = request;
//           const result = processRecipientApprovalFromUser(newChildKey, data);
//         }
//       });
//     },
//     (err) => {
//       console.error(`Encountered error: ${err}`);
//     }
//   );
// }

// async function processRecipientApprovalFromUser(newChildKey, data) {
//   try {
//     // console.log("process Recipient approval from user");
//     if (data.hasOwnProperty("freeFoodUser") && data.freeFoodStatus == false) {
//       // console.log("freeFoodUser available");
//       let foodUserDetails = data.freeFoodUser;
//       if (
//         foodUserDetails.hasOwnProperty("employer") &&
//         foodUserDetails.hasOwnProperty("income") &&
//         foodUserDetails.hasOwnProperty("profession") &&
//         foodUserDetails.hasOwnProperty("QID")
//       ) {
//         // console.log("all other fields available");
//         // console.log("min sal is => " + freeFoodUserMinSal);
//         if (
//           foodUserDetails.employer.length > 0 &&
//           foodUserDetails.income < freeFoodUserMinSal &&
//           foodUserDetails.profession.length > 0 &&
//           foodUserDetails.QID.length > 0
//         ) {
//           // console.log("all other fields' data available");
//           let email = data.email;

//           const datas = await recipientsService.setRecipientApprovedFromUser(
//             newChildKey
//           );
//           const result = {
//             status: "SuCCESS",
//             message: "Approved recipient",
//             data: datas,
//           };

//           return result;
//         }
//       }
//     }
//   } catch (error) {}
// }

/**
 * Add listener with re send response Tried
 */
/* async function startListenerForNearbyRestaurant(req, res, next) {
  startNearbyRestaurantListenerPromise().then((data) => {
    // console.log("Restaurant requested for: ", data);

    processNearRestaurantData(data).then((results) => {
      // console.log("Restaurant Lis: ", results);
    });
  });
} */

/**
 * Add listener with re send response Tried
 */
/* function startNearbyRestaurantListenerPromise() {
  return new Promise((resolve, reject) => {
    const refOutletRequet = rtdbs.ref("outlet-request");

    refOutletRequet.on("child_added", (snapshot) => {
      const data = snapshot.val();
      // console.log("Outlet request added:", data);
      resolve(data);
    });
  });
} */

/**
 * 1st basic Method call for outlet
 */
/* function startNearbyRestaurantListener() {
  const refOutletRequet = rtdbs.ref("outlet-request");

  refOutletRequet.on("child_added", (snapshot) => {
    const data = snapshot.val();
    // console.log("Outlet request added:", data);
  });

  res.send("Listening to firebase events...");
  // res.status(200).json(data);
} */

/**
 * Get all Recipients
 */
// async function getAllRecipient(req, res, next) {
//   try {
//     res.json(await recipientsService.getAllRecipients());
//   } catch (err) {
//     console.error(`Error while getting Users`, err.message);
//     next(err);
//   }
// }

/**
 * set Recipient approved
 */
// async function setRecipientApproved(req, res, next) {
//   let username = req.username;
//   try {
//     // console.log("username: ", username);
//     let response = await recipientsService.setRecipientApproved(username);
//     if (response == "SUCCESS") {
//       res.json({ message: "SUCCESS" });
//     } else {
//       res.json({ message: "FAILED" });
//     }
//   } catch (err) {
//     console.error(`Error while auto approve recipient: `, err.message);
//     next(err);
//   }
// }

// module.exports = {
//   getAllRecipient,
//   setRecipientApproved,
//   startListener,
//   userApprovalForRecipient,
// };

/* exports.createUser = functions.firestore
  .document("outlet_request")
  .onCreate((snap, context) => {
    console.log("inside the trigger");
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = snap.data();

    // access a particular field as you would any JS property
    const name = newValue.name;

    // perform desired operations ...
  }); */

// io.on("connection", (socket) => {
//   console.log("A user connected!");

/**
 * event listning to the child_added outlet_request
 */
/* var ref = rtdbs.ref("outlet-request");
ref.on("child_added", function (snapshot) {
  console.log("Triggered 2");
}); */

/* socket.on("disconnect", () => {
  console.log("A user disconnected!");
}); */
// });
