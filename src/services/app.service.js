// Imports
var firebase = require("firebase-admin");
var nodemailer = require("nodemailer");
var geodist = require("geodist");
var distance = require("google-distance");
distance.apiKey = "AIzaSyDHdYxeCPftshFE74MnxQriFsamD2iqLNc";

// Service key for firebase
var serviceAccount = require("./serviceAccountKey.json");

// Initialize nodemailer
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ulaanotifications@gmail.com",
    pass: "Kajan26@yazhi",
  },
});
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://ulaa-695ed.firebaseio.com",
});

var db = firebase.database();
var ref = db.ref("later-deals");
ref.on("child_added", function (snapshot) {
  var booking = snapshot.val();
  //console.log(booking);
  if (booking.status == "pending") {
    let sexFilter = "any";
    if (booking.sexFilter) {
      sexFilter = booking.sexFilter;
    }
    db.ref("hire-assignments").push({
      bookingKey: snapshot.key,
      vehicleType: booking.vehicle,
      passengerLocation: booking.origin.location,
      passengerPhone: booking.passengerPhone,
      sexFilter: sexFilter,
    });
    var subjectText = "New booking recieved from " + booking.passengerPhone;
    console.log(subjectText);
    var htmlBody =
      '<div align="center" width="60%"><h2>Booking Details</h2><div><br>' +
      '<table width="50%">' +
      "<tr>" +
      "<td>Passenger</td>" +
      "<td>:</td>" +
      "<td>" +
      booking.passengerPhone +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Date</td>" +
      "<td>:</td>" +
      "<td>" +
      booking.date +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Time</td>" +
      "<td>:</td>" +
      "<td>" +
      booking.time +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Vehicle</td>" +
      "<td>:</td>" +
      "<td>" +
      booking.vehicle +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>No of Passengers</td>" +
      "<td>:</td>" +
      "<td>" +
      booking.data.noOfPassengers +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>AC Needed</td>" +
      "<td>:</td>" +
      "<td>" +
      booking.data.isAcNeeded +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>From</td>" +
      "<td>:</td>" +
      "<td>" +
      booking.origin.vicinity +
      " (" +
      booking.origin.location.lat +
      ", " +
      booking.origin.location.lng +
      ') <a href="https://www.google.com/maps/place/' +
      booking.origin.location.lat +
      ", " +
      booking.origin.location.lng +
      '">Map</a></td>' +
      "</tr>" +
      "<tr>" +
      "<td>To</td>" +
      "<td>:</td>" +
      "<td>" +
      booking.destination.vicinity +
      " (" +
      booking.destination.location.lat +
      ", " +
      booking.destination.location.lng +
      ') <a href="https://www.google.com/maps/place/' +
      booking.destination.location.lat +
      ", " +
      booking.destination.location.lng +
      '">Map</a></td>' +
      "</tr>" +
      "<tr>" +
      "<td>Requested On :</td>" +
      "<td>:</td>" +
      "<td>" +
      new Date(booking.createdAt).toLocaleString("en-US", {
        timeZone: "Asia/Colombo",
      }) +
      "</td>" +
      "</tr>" +
      "</table>";
    //console.log(new Date(booking.createdAt));
    if (true) {
      sendEMAIL(subjectText, htmlBody);
    }
  }
});

var refBus = db.ref("bookings");
refBus.on("child_added", function (snapshot) {
  var booking = snapshot.val();
  if (booking.status != "confirmed" && booking.status != "canceled") {
    console.log(snapshot.key);
    var subjectText = "New Bus booking recieved from " + booking.mobile;
    console.log(subjectText);
    var htmlBody =
      '<div align="center" width="60%"><h2>Booking Details</h2><div><br>' +
      '<table width="50%">' +
      "<tr>" +
      "<td>Bus</td>" +
      "<td>:</td>" +
      "<td>" +
      booking.busname +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Passenger</td>" +
      "<td>:</td>" +
      "<td>" +
      booking.mobile +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Date</td>" +
      "<td>:</td>" +
      "<td>" +
      booking.date +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Seats</td>" +
      "<td>:</td>" +
      "<td>" +
      booking.seats +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>From</td>" +
      "<td>:</td>" +
      "<td>" +
      booking.from +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>To</td>" +
      "<td>:</td>" +
      "<td>" +
      booking.to +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Requested On :</td>" +
      "<td>:</td>" +
      "<td>" +
      new Date(booking.createdAt).toLocaleString("en-US", {
        timeZone: "Asia/Colombo",
      }) +
      "</td>" +
      "</tr>" +
      "</table>";
    if (true) {
      sendEMAIL(subjectText, htmlBody);
    }

    if (true) {
      let message =
        "Bus : " +
        booking.busname +
        "%0aReference : " +
        booking.createdAt +
        "%0aDate : " +
        booking.date +
        "%0aSeats : " +
        booking.seats +
        "%0aFrom : " +
        booking.from +
        "%0aTo : " +
        booking.to +
        "%0aDeparture : " +
        booking.departure +
        "%0aPrice : Rs. " +
        booking.fare +
        ".00" +
        "%0aStatus : NOT PAID";
      sendSMS(booking.mobile, message);
    }
  }
});

var refBus = db.ref("pin-requests");
refBus.on("child_added", function (snapshot) {
  var pinReqs = snapshot.val();
  db.ref("pin-requests/" + snapshot.key).remove();
  console.log(pinReqs);
  if (true) {
    const http = require("http");

    let url =
      "http://localhost/sms-gateway/sendsms.php?mobile=" +
      pinReqs.phoneNumber +
      "&message=Your OTP PIN number for Semba Ulaa is " +
      (pinReqs.createdAt % 10000) +
      ". For further assistance please call +94772004422.";

    //let url ='http://localhost/sms-gateway/send-otp.php?mobile=' + pinReqs.phoneNumber + '&message=Your OTP PIN number for Ulaa is ' + pinReqs.createdAt % 10000 + '. For further assistance please call +94772004422.'

    http
      .get(url, (resp) => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          console.log("Completed");
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  }
});

var refBus = db.ref("hire-assignments");
refBus.on("child_added", function (snapshot) {
  var assignment = snapshot.val();
  db.ref("hire-assignments/" + snapshot.key).remove();
  db.ref("later-deals/" + assignment.bookingKey).once(
    "value",
    function (dealSnapshot) {
      var deal = dealSnapshot.val();
      var previousDrivers = [];
      if (deal.driverId) {
        db.ref("drivers/" + deal.driverId).update({ status: "available" });
        if (deal.previousDrivers) {
          previousDrivers = deal.previousDrivers;
          previousDrivers.push(deal.driverId);
        } else {
          previousDrivers.push(deal.driverId);
        }
      } else {
        if (deal.previousDrivers) {
          previousDrivers = deal.previousDrivers;
        }
      }
      db.ref("master_settings/hire").once("value", function (hireSnapshot) {
        var hireSettings = hireSnapshot.val();
        var driverAlive = hireSettings.driverAlive;
        var driverApproval = hireSettings.driverApproval;
        console.log(
          "driverAlive ",
          driverAlive,
          ", driverApproval ",
          driverApproval
        );
        db.ref("master_settings/version").once(
          "value",
          function (versionSnapshot) {
            var compatibleVersion = versionSnapshot.val();
            var compatibleVersionInt = parseInt(compatibleVersion);
            //console.log(latestVersion);
            db.ref("master_settings/range").once(
              "value",
              function (rangeSnapshot) {
                var range = rangeSnapshot.val();
                range = parseInt(range) * 1000;
                //console.log(range);
                //console.log(assignment.passengerLocation);
                var driverKeySelected = "";
                var driverMobileSelected = "";
                var driverDistanceSelected = range;
                var driverKeyNearest = "";
                var driverDistanceNearest = 1000000;
                var driverVersionNearest = "";
                db.ref("drivers/").once("value", function (driversSnapshot) {
                  var driverArraySize = driversSnapshot.numChildren();
                  var driverCount = 0;
                  var driverArray = [];
                  driversSnapshot.forEach(function (driverSnapshot) {
                    var driverKey = driverSnapshot.key;
                    var driverData = driverSnapshot.val();
                    if (driverData.last_active) {
                      var lastActive = new Date(
                        driverData.last_active
                      ).getTime();
                      var diff = new Date().getTime() - lastActive;
                      if (diff < driverAlive) {
                        if (
                          (assignment.vehicleType == driverData.type &&
                            (assignment.sexFilter == "any" ||
                              assignment.sexFilter == driverData.sex)) ||
                          (assignment.vehicleType == "3wheel" &&
                            driverData.type == "taxi")
                        ) {
                          if (driverData.status != "busy") {
                            if (driverData.location) {
                              driverArray.push(driverKey);
                              //var from = {lat: driverData.location.lat, lon: driverData.location.lng};
                              //var to = {lat: assignment.passengerLocation.lat, lon: assignment.passengerLocation.lng};
                              //var dist = geodist(from, to, {exact: true, unit: 'km'});
                              var from =
                                driverData.location.lat +
                                "," +
                                driverData.location.lng;
                              var to =
                                assignment.passengerLocation.lat +
                                "," +
                                assignment.passengerLocation.lng;
                              distance.get(
                                {
                                  origin: from,
                                  destination: to,
                                  mode: "driving",
                                  units: "metric",
                                },
                                function (err, data) {
                                  if (err) {
                                    return console.log(err);
                                  } else {
                                    var dist = data.distanceValue;
                                    console.log(dist);
                                    var version = "0";
                                    if (driverData["version"] != undefined) {
                                      if (
                                        driverData["version"][
                                          "__zone_symbol__value"
                                        ]
                                      ) {
                                        version =
                                          driverData["version"][
                                            "__zone_symbol__value"
                                          ].toString();
                                        if (version.match(".")) {
                                          version = version.replace(".", "0");
                                          if (version.match(".")) {
                                            version = version.replace(".", "0");
                                          }
                                        }
                                      }
                                    }
                                    var versionInt = parseInt(version);
                                    if (versionInt) {
                                      if (
                                        dist < range &&
                                        versionInt >= compatibleVersionInt
                                      ) {
                                        //console.log(driverKey);
                                        //console.log(dist);
                                        if (dist < driverDistanceSelected) {
                                          if (
                                            !previousDrivers.includes(driverKey)
                                          ) {
                                            driverKeySelected = driverKey;
                                            driverMobileSelected =
                                              driverData.phoneNumber;
                                            driverDistanceSelected = dist;
                                          } else {
                                            console.log(
                                              "previous driver ",
                                              driverKey
                                            );
                                          }
                                        } else {
                                          if (dist < driverDistanceNearest) {
                                            driverKeyNearest = driverKey;
                                            driverDistanceNearest = dist;
                                            driverVersionNearest = versionInt;
                                          }
                                          console.log("far ", driverKey);
                                        }
                                      } else {
                                        if (dist < driverDistanceNearest) {
                                          driverKeyNearest = driverKey;
                                          driverDistanceNearest = dist;
                                          driverVersionNearest = versionInt;
                                        }
                                        if (
                                          "qD3pkZ7di6bv57d2475QUDTzv7y2" ==
                                          driverKey
                                        ) {
                                          console.log(from);
                                          console.log(to);
                                          console.log(driverKey);
                                          console.log(dist);
                                          console.log(versionInt);
                                          console.log(compatibleVersionInt);
                                          console.log(
                                            dist < parseInt(range) &&
                                              versionInt >= compatibleVersionInt
                                          );
                                        }
                                      }
                                    }
                                  }
                                  driverArray = driverArray.filter(
                                    (elem) => elem != driverKey
                                  );
                                  if (driverArray.length < 1) {
                                    console.log("Job is completed");
                                    console.log(assignment.bookingKey);
                                    console.log(driverKeySelected);
                                    console.log(driverMobileSelected);
                                    console.log(driverDistanceSelected);
                                    db.ref(
                                      "later-deals/" + assignment.bookingKey
                                    ).update({
                                      driverId: driverKeySelected,
                                      driverPhone: driverMobileSelected,
                                      driverDistance: driverDistanceSelected,
                                      previousDrivers: previousDrivers,
                                    });
                                    if (driverKeySelected != "") {
                                      var message =
                                        "Please accept the hire request from " +
                                        deal.passengerPhone +
                                        ". Pick up location : " +
                                        deal.origin.vicinity +
                                        " on " +
                                        deal.date +
                                        " at " +
                                        deal.time;
                                      sendSMS(driverMobileSelected, message);
                                      setTimeout(function () {
                                        console.log(
                                          "trying for another driver"
                                        );
                                        db.ref("hire-assignments").push({
                                          bookingKey: assignment.bookingKey,
                                          vehicleType: assignment.vehicleType,
                                          passengerLocation:
                                            assignment.passengerLocation,
                                          passengerPhone:
                                            assignment.passengerPhone,
                                          sexFilter: assignment.sexFilter,
                                        });
                                      }, driverApproval);
                                    } else {
                                      db.ref(
                                        "later-deals/" + assignment.bookingKey
                                      ).update({
                                        status: "canceled",
                                      });
                                      var message =
                                        "All drivers are busy at this moment. Please try again later. Appologize for the inconvenience caused.";
                                      sendSMS(deal.passengerPhone, message);
                                      if (driverKeyNearest != "") {
                                        var adminMessage =
                                          "Nearest Driver details : " +
                                          "%0aDriver Key : " +
                                          driverKeyNearest +
                                          "%0aDistance : " +
                                          driverDistanceNearest +
                                          "%0aVersion : " +
                                          driverVersionNearest;
                                        console.log(
                                          "Nearest driver ",
                                          driverKeyNearest
                                        );
                                        console.log(
                                          "Nearest driver distance ",
                                          driverDistanceNearest
                                        );
                                        console.log(
                                          "Nearest driver version ",
                                          driverVersionNearest
                                        );
                                        sendSMS("0773959695", adminMessage);
                                      } else {
                                      }
                                    }
                                  }
                                }
                              );
                            }
                          }
                        } else {
                          //console.log('vehicle type not matched : ', assignment.vehicleType, driverData.type);
                        }
                      } else {
                        console.log(
                          "last_active: ",
                          lastActive,
                          "diff : ",
                          diff
                        );
                      }
                    }
                    driverCount = driverCount + 1;
                  });
                });
              }
            );
          }
        );
      });
    }
  );
  // do some stuff once
});

//db.ref("localities/").once('child_added', function(locationSnapshot) {
//  updateDriverLocation(locationSnapshot);
//});
db.ref("localities/").on("child_changed", function (locationSnapshot) {
  //console.log(locationSnapshot);
  updateDriverLocation(locationSnapshot);
});

function updateDriverLocation(locationSnapshot) {
  //console.log(locationSnapshot);
  var locationKey = locationSnapshot.key;
  db.ref("localities/" + locationKey).once(
    "value",
    function (vehicleTypesSnapshot) {
      vehicleTypesSnapshot.forEach(function (vehicleTypeSnapshot) {
        var vehicleType = vehicleTypeSnapshot.key;
        db.ref("localities/" + locationKey + "/" + vehicleType).once(
          "value",
          function (driversSnapshot) {
            driversSnapshot.forEach(function (driverSnapshot) {
              var driverKey = driverSnapshot.key;
              var driverData = driverSnapshot.val();
              //console.log(driverData);
              //db.ref("localities/" + locationKey + "/"+ vehicleType + "/" + driverKey).remove();
              if ("qD3pkZ7di6bv57d2475QUDTzv7y2" == driverKey) {
                console.log("localities/" + locationKey + "/" + vehicleType);
                console.log(driverData);
              }
              db.ref("drivers/" + driverKey).once(
                "value",
                function (driverFromDBSnapshot) {
                  var driverDataFromDB = driverFromDBSnapshot.val();
                  var locationString =
                    "localities/" +
                    locationKey +
                    "/" +
                    vehicleType +
                    "/" +
                    driverKey;
                  if (driverDataFromDB.last_active > driverData.last_active) {
                    db.ref(
                      "localities/" +
                        locationKey +
                        "/" +
                        vehicleType +
                        "/" +
                        driverKey
                    ).remove();
                  } else {
                    db.ref("drivers/" + driverKey).update({
                      location: {
                        lat: driverData.lat,
                        lng: driverData.lng,
                      },
                      previousLocation: locationString,
                      version: driverData.version,
                      platform: driverData.platform,
                      last_active: driverData.last_active,
                    });
                  }
                }
              );
            });
          }
        );
      });
    }
  );
}

function sendSMS(to, message) {
  const http = require("http");

  //let url ='http://localhost:8888/sms-gateway/send-otp.php?mobile=' + formatNumber(to) + '&message=' + message;
  let url =
    "http://localhost/sms-gateway/sendsms.php?mobile=" +
    formatNumber(to) +
    "&message=" +
    message;
  //let url ='http://localhost/sms-gateway/send-otp.php?mobile=' + formatNumber(to) + '&message=' + message;
  console.log(url);
  http
    .get(encodeURI(url), (resp) => {
      let data = "";
      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
      });
      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        console.log("SMS sent to ", to, message);
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}

function sendEMAIL(subjectText, htmlBody) {
  var mailOptions = {
    from: "ulaanotifications@gmail.com",
    to: "csupport@yazhii.net,ulaacclk@gmail.com",
    subject: subjectText,
    html: htmlBody,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Taxi Email sent: " + info.response);
    }
  });
}

function formatNumber(number) {
  if (number.length == 13) {
    let intlMatch = number.match("^0094([0-9]{9})$");
    if (intlMatch.length > 1) {
      return "94" + intlMatch[1];
    } else {
      return "0";
    }
  } else if (number.length == 11) {
    let intlMatch = number.match("^94[0-9]{9}$");
    if (intlMatch.length > 0) {
      return number;
    } else {
      return "0";
    }
  } else if (number.length == 10) {
    let localMatch = number.match("^0([0-9]{9})$");
    if (localMatch.length > 1) {
      return "94" + localMatch[1];
    } else {
      return "0";
    }
  } else if (number.length == 9) {
    let localMatch = number.match("^[0-9]{9}$");
    if (localMatch.length > 0) {
      return "94" + number;
    } else {
      return "0";
    }
  }
}
