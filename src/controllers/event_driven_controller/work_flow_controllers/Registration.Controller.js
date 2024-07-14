// const { db, rtdb, rtdbs } = require("../../../../config/firebase.config");
// const recipientsService = require("../../../services/recipients.service");
// const { FlowManager } = require("flowed");
// const SendUserToAdminForApproval = require("../../../services/work_flow_services/SendAdminForApproval.resolver.service");
// const SendEmailToAdminNotification = require("../../../services/work_flow_services/SendEmailNotification.resolver.service");
// const SendDeliveryPartnerToAdminApproval = require("../../../services/work_flow_services/SendDeliveryPartnerToAdminApproval.resolver.service");
// const config = require("config");
// let freeFoodUserMinSal = config.get("free_food_user_min_salary");
// const workflowService = require("../../../services/workflow.service");
// const SendRiderToAdminApproval = require("../../../services/work_flow_services/SendRiderToAdminApproval.resolver.service");

// /**
//  * subscribe the user collection for approve free food user Controller
//  */
// function subscribeUserTableForFreeFoodUser() {
//   try {
//     const refRecipientApprovalRequet = db.collection("users");
//     const observer = refRecipientApprovalRequet.onSnapshot((snapshots) => {
//       // console.log("DEBUG>> out of the ForEach");
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
//     });
//   } catch (err) {
//     console.error(`Error while getting Users`, err.message);
//     next(err);
//   }
// }

// /**
//  * methode to free food User approval process
//  * @param {*} newChildKey
//  * @param {*} data
//  * @returns
//  */
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
//         if (
//           foodUserDetails.employer.length > 0 &&
//           foodUserDetails.income < freeFoodUserMinSal &&
//           foodUserDetails.profession.length > 0 &&
//           foodUserDetails.QID.length > 0
//         ) {
//           // console.log("all other fields validated");
//           let documentId = newChildKey;

//           let wfs = await workflowService.getWorkflowByName('FreeFoodUser');
//           // console.log("wfs",wfs);
//           // console.log("Got workflow from DB");
//           let wf = wfs[0].workflow;/* JSON.parse(wfs[0].workflow); */
//           // console.log("wf",wf);
//           // The parameters
//           let params = {
//             documentId: documentId,
//           };

//           // The resolvers mapping
//           let resolversMap = {
//             sendAdminForApproval: SendUserToAdminForApproval.exec,
//             sendEmailNotification: SendEmailToAdminNotification.exec,
//           };

//           FlowManager.run(wf, params, ["isAuthorized"], resolversMap)
//             .then((results) => {
//               // Get the results when flow promise is solved
//               // console.log("DEBUG>> results => ", results);
//               console.log(
//                 results.isAuthorized
//                   ? "User authorized!"
//                   : "User not autorized :("
//               );
//             })
//             .catch((error) => {
//               // In case of error, catch it here
//               console.error(
//                 `There has been an error running the flow: ${error.message}`
//               );
//             });
//           //-------------------- End Of Work flow -----------------------
//         }
//       }
//     }
//   } catch (error) {}
// }

// /**
//  * subscribe the delivery partner collection for approve delivery partner Controller
//  */
// function subscribeDeliveryPartnerTableForApproval() {
//   try {
//     const deliveryPartnerCollectionRef = db.collection("delivery_partner");
//     const observer = deliveryPartnerCollectionRef.onSnapshot((snapshots) => {
//       // console.log("DEBUG>> before of the ForEach");
//       snapshots.docChanges().forEach((change) => {
//         if (change.type === "added" /* ||  change.type === "modified" */) {
//           // console.log("Modified Event triggered to delivery partner");
//           let doc = change.doc;
//           let request = change.doc.data();

//           const newChildKey = doc.id;
//           // console.log("UUID => ", newChildKey);
//           const data = request;
//           const result = processDeliveryPartnerApproval(newChildKey, data);
//         }
//       });
//     });
//   } catch (err) {
//     console.error(`Error while getting Users`, err.message);
//     next(err);
//   }
// }

// /**
//  * methode to free food User approval process
//  * @param {*} newChildKey
//  * @param {*} data
//  * @returns
//  */
// async function processDeliveryPartnerApproval(newChildKey, data) {
//   try {
//     // console.log("process Delivery partner approval");
//     if (data.hasOwnProperty("name") && data.status == false) {
//       // console.log("delivery partner added");
//       let deliveryPartner = data;
//       if (
//         deliveryPartner.hasOwnProperty("vehicleLicensePlate") &&
//         deliveryPartner.hasOwnProperty("vehicleType") &&
//         deliveryPartner.hasOwnProperty("vehicleColor") &&
//         deliveryPartner.hasOwnProperty("licenseExpDate")
//       ) {
//         // console.log("all other fields available");
//         let licenseExpDate = new Date(deliveryPartner.licenseExpDate);
//         let todayDate = new Date();
//         // console.log("DEBUG>> licenseExpDate => ", licenseExpDate);
//         // console.log("DEBUG>> todayDate => ", todayDate);
//         let notExpired = licenseExpDate > todayDate ? true : false;
//         if (
//           deliveryPartner.vehicleLicensePlate.length > 0 &&
//           deliveryPartner.vehicleType.length > 0 &&
//           deliveryPartner.vehicleColor.length > 0 &&
//           notExpired
//         ) {
//           let documentId = newChildKey;
//           /* let wf = {
//             tasks: {
//               AssignAdminForApproval: {
//                 requires: ["documentId"],
//                 provides: [
//                   "document_Id",
//                   "documentObject",
//                   "mailMessage",
//                   "admins_emails",
//                 ],
//                 resolver: {
//                   name: "sendAdminForApproval",
//                   params: {
//                     documentId: "documentId",
//                   },
//                   results: {
//                     document_Id: "document_Id",
//                     documentObject: "documentObject",
//                     mailMessage: "mailMessage",
//                     admins_emails: "admins_emails",
//                   },
//                 },
//               },
//               SendEmailNotification: {
//                 requires: [
//                   "document_Id",
//                   "documentObject",
//                   "mailMessage",
//                   "admins_emails",
//                 ],
//                 provides: ["isAuthorized"],
//                 resolver: {
//                   name: "sendEmailNotification",
//                   params: {
//                     document_Id: "document_Id",
//                     documentObject: "documentObject",
//                     mailMessage: "mailMessage",
//                     admins_emails: "admins_emails",
//                   },
//                   results: {
//                     isAuthorized: "isAuthorized",
//                   },
//                 },
//               },
//             },
//           }; */

//           let wfs = await workflowService.getWorkflowByName('DeliveryPartner');
//           let wf = wfs[0].workflow;/* JSON.parse(wfs[0].workflow); */
//           // console.log("wf",wf);
//           // The parameters
//           let params = {
//             documentId: documentId,
//           };

//           // The resolvers mapping
//           let resolversMap = {
//             sendAdminForApproval: SendDeliveryPartnerToAdminApproval.exec,
//             sendEmailNotification: SendEmailToAdminNotification.exec,
//           };

//           FlowManager.run(wf, params, ["isAuthorized"], resolversMap)
//             .then((results) => {
//               // Get the results when flow promise is solved
//               // console.log("DEBUG>> results => ", results);
//               console.log(
//                 results.isAuthorized
//                   ? "User authorized!"
//                   : "User not autorized :("
//               );
//             })
//             .catch((error) => {
//               // In case of error, catch it here
//               console.error(
//                 `There has been an error running the flow: ${error.message}`
//               );
//             });
//           //-------------------- End Of Work flow -----------------------
//         }
//       }
//     }
//   } catch (error) {}
// }

// /**
//  * subscribe the Rider collection for approve Rider Controller
//  */
// function subscribeRiderTableForApproval() {
//   try {
//     const riderCollectionRef = db.collection("riders");
//     const observer = riderCollectionRef.onSnapshot((snapshots) => {
//       // console.log("DEBUG>> before of the ForEach");
//       snapshots.docChanges().forEach((change) => {
//         if (change.type === "added") {
//           // console.log("Modified Event triggered to rider");
//           let doc = change.doc;
//           let request = change.doc.data();

//           const newChildKey = doc.id;
//           // console.log("UUID => ", newChildKey);
//           const data = request;
//           const result = processRiderApproval(newChildKey, data);
//         }
//       });
//     });
//   } catch (err) {
//     console.error(`Error while getting Rider`, err.message);
//     next(err);
//   }
// }

// /**
//  * methode to Rider approval process
//  * @param {*} newChildKey
//  * @param {*} data
//  * @returns
//  */
// async function processRiderApproval(newChildKey, data) {
//   try {
//     // console.log("process Rider approval");
//     if (data.hasOwnProperty("full_name") && data.status == false) {
//       // console.log("rider added");
//       let rider = data;
//       let vehicle = rider.vehicle
//       // console.log(JSON.stringify(vehicle));
//       if (
//         vehicle.hasOwnProperty("vehicle_number") &&
//         vehicle.hasOwnProperty("vehicle_type") &&
//         vehicle.hasOwnProperty("vehicle_colour") &&
//         vehicle.hasOwnProperty("revenue_licence_expiry")
//       ) {
//         // console.log("all other fields available");
//         let licenseExpDate = new Date(vehicle.revenue_licence_expiry);
//         let todayDate = new Date();
//         // console.log("DEBUG>> licenseExpDate => ", licenseExpDate);
//         // console.log("DEBUG>> todayDate => ", todayDate);
//         let notExpired = licenseExpDate > todayDate ? true : false;
//         if (
//           vehicle.vehicle_number.length > 0 &&
//           vehicle.vehicle_type.length > 0 &&
//           vehicle.vehicle_colour.length > 0 &&
//           notExpired
//         ) {
//           // console.log("all other fields values available");
//           let documentId = newChildKey;
          
//           let wfs = await workflowService.getWorkflowByName('Rider');
//           let wf = wfs[0].workflow;/* JSON.parse(wfs[0].workflow); */
//           // console.log("wf",wf);
//           // The parameters
//           let params = {
//             documentId: documentId,
//           };

//           // The resolvers mapping
//           let resolversMap = {
//             sendAdminForApproval: SendRiderToAdminApproval.exec,
//             sendEmailNotification: SendEmailToAdminNotification.exec,
//           };

//           FlowManager.run(wf, params, ["isAuthorized"], resolversMap)
//             .then((results) => {
//               // Get the results when flow promise is solved
//               // console.log("DEBUG>> results => ", results);
//               console.log(
//                 results.isAuthorized
//                   ? "User authorized!"
//                   : "User not autorized :("
//               );
//             })
//             .catch((error) => {
//               // In case of error, catch it here
//               console.error(
//                 `There has been an error running the flow: ${error.message}`
//               );
//             });
//           //-------------------- End Of Work flow -----------------------
//         }
//       }
//     }
//   } catch (error) {}
// }

// module.exports = {
//   subscribeUserTableForFreeFoodUser,
//   subscribeDeliveryPartnerTableForApproval,
//   subscribeRiderTableForApproval
//   /* createWorkFlowEngine, */
// };
