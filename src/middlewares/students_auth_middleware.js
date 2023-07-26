const { verifyStudentToken } = require('../services/students_auth_service');

// Student JWT validation
const validateStudentRequest = (request, response, next) => {
  // console.log(request.headers) // log header information in the console

  try {
    // Check if there is an auth token in the header
    if (request.headers.authorization) {
      // Refactor the token string so it returns just the token and no 'bearer' text from the initial return of data from the header request
      const studentToken = request.headers.authorization.split(" ")[1];
      // If the token is invalid, or not working as expected, throw an error
      if (!studentToken) {
        return response.status(401).json({ Error: "A token is required to view this page or take this action." })
      }

      // Verify the student token
      const decodedStudent = verifyStudentToken(studentToken)
      // Add the decoded student token as a request, so we can access it in the app
      request.validStudent = decodedStudent
      return next();

      // Else if no Student token is present, throw an error
    } else {
      return response.status(403).json({ Error: "Not authenticated to view this page or take this action." })
    }

  } catch (error) {
    console.error(error);
    next(error)
  }
  return next()
}

module.exports = validateStudentRequest