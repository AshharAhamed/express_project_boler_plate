const { db } = require("../../config/firebase.config");

/**
 * Get all Foods Service
 */

async function getAllFoods() {
  const foods = await db.collection("foods");
  const data = await foods.get();
  let response = [];
  let docs = data.docs;

  for (let doc of docs) {
    response.push(doc.data());
  }

  return response;
}

/**
 *
 * @returns
 */
async function getAllFoodsByRestaurant(restaurantId) {
  const foodsRef = await db.collection("foods");
  const snapshot = await foodsRef.where("restaurantId", "==", restaurantId).get();
  let foods = [];
  let docs = snapshot.docs;

  if (snapshot.empty) {
    // console.log("No matching documents.");
    return;
  }

  for (let doc of docs) {
    foods.push(doc.data());
  }

  return foods;
}

module.exports = {
    getAllFoods,
    getAllFoodsByRestaurant,
};
