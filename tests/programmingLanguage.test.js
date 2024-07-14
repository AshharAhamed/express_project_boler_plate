const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  // console.log("Mongo DB URI is => " + process.env.mongoURI)
  await mongoose.connect(process.env.mongoURI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

/**
 * Unit Test for Get All programming language by GET Method
 */
describe("GET /api/v1/programmingLanguages/", () => {
  it("should return all programming languages", async () => {
    const res = await request(app).get("/api/v1/programmingLanguages/");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

/**
 * Unit Test for Insert new programming language POST Method
 */
describe("POST /api/v1/programmingLanguages/", () => {
  it("should create a programming language", async () => {
    const res = await request(app).post("/api/v1/programmingLanguages/").send({
      name: "C#",
      year: "2000",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("C# successfully added");
  });
});

/**
 * Unit Test for Get programming language by its name GET Method
 */
describe("GET /api/v1/programmingLanguages/Express JS", () => {
  it("should return all programming languages", async () => {
    const res = await request(app).get(
      "/api/v1/programmingLanguages/Express JS"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Express JS");
  });
});
