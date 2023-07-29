const mongoose = require('mongoose');
const request = require('supertest');
const { databaseConnector } = require("../src/database");
const Move = require('../src/models/moves')
const { app } = require('../src/server');

// Test category data retrievals
describe("...categories functionality...", () => {
  // Connect to the test database
  beforeEach(async () => {
  await databaseConnector();
  });

  // Drop the database and close the connection after all tests
  afterEach(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  });

  describe ("...getting a list of all categories...", () => {
    it("...responds with status 200", async () => {
      const moveCategories = [
        {moveName:"Allegra", moveCategory: "inverts"}, 
        {moveName: "Sandra", moveCategory: "spins"}, 
        {moveName: "Stag Pose", moveCategory: "aerials"}
      ]
      await Move.insertMany(moveCategories);
      
      const response = await request(app).get("/moves/categories")
      expect(response.statusCode).toBe(200);
    })
  })
    
    it("...should return with a 404 error if no categories are found", async () => {
      const response = await request(app).get("/moves/categories")
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({Error: "No categories found."})
    })

  describe ("...getting a specific move...", () => {
    it("...responds with status 200", async () => {
      const specificMove = new Move({
        moveName: "Brass Monkey - Hold",
        moveCategory: "inverts",
        moveAlternativeName: "Funky Monkey",
      })
      
      await Move.create(specificMove);
      
      const response = await request(app).get(`/moves/${specificMove._id}`);
      expect(response.statusCode).toBe(200);
    })
  })

        
  })
  
    // Additional testing required for getCategoryMoves

