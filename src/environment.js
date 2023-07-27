// Ensure .env data is ready for use
const dotenv = require('dotenv')
dotenv.config();

// Load environment variables
var NODE_ENV = process.env.NODE_ENV.toLowerCase();
var STUDENT_SECRET_KEY = process.env.STUDENT_SECRET_KEY;
var TEACHER_SECRET_KEY = process.env.TEACHER_SECRET_KEY;
var DATABASE_URL = process.env.DATABASE_URL;

module.exports = {
  NODE_ENV,
  STUDENT_SECRET_KEY,
  TEACHER_SECRET_KEY,
  DATABASE_URL,
}