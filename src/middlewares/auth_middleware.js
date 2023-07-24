const { verifyStudentToken } = require("../services/users_auth_service");

const validateStudentRequest = (request, response, next) => {
  console.log(request.headers) // log header information in the console

  try {
    // Check if there is an auth token in the header
    if (request.headers.authorization) { 
      // Refactor the token string so it returns just the token and no 'bearer' text from the initial return of data from the header request
      const studentToken = request.headers.authorization.split(" ")[1]; 
      // If the token is invalid, or not working as expected, throw an error error
      if (!studentToken) { 
        throw new Error ("A token is required to view this page or take this action.")
      }

      // Verify the student token
      const decodedStudent = verifyStudentToken(studentToken)
      request.validStudent = decodedStudent
      return next();

  // Else if no Student token is present, throw an error
  } else {
    throw new Error ("Not authenticated to view this page or take this action.") 
  }

  
  } catch (error) {
    next(error)
  }
  return next()
}

module.exports = validateStudentRequest