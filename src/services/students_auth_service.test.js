const service = require('./students_auth_service');

describe("Student Auth Service", () => {

  describe("creating a student token", () => {
    it("should generate a token", async () => {
      const token = service.createStudentToken('studentId', 'email');
      expect(token).toBeTruthy();
    });
  });

  describe("verifying a student token", () => {
    let token = "";

    beforeAll(() => {
      token = service.createStudentToken('studentId', 'email');
    });

    it("should accept a valid token", async () => {
      expect(service.verifyStudentToken(token)).toBeTruthy();
    });

    it("should reject an invalid token", async () => {
      expect(() => service.verifyStudentToken('bad-token')).toThrowError();
    })
  });

});