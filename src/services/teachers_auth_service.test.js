const service = require('./teachers_auth_service');

describe("Teacher Auth Service", () => {

  describe("creating a teacher token", () => {
    it("should generate a token", async () => {
      const token = service.createTeacherToken('teacherId', 'email');
      expect(token).toBeTruthy();
    });
  });

  describe("verifying a teacher token", () => {
    let token = "";

    beforeAll(() => {
      token = service.createTeacherToken('teacherId', 'email');
    });

    it("should accept a valid token", async () => {
      expect(service.verifyTeacherToken(token)).toBeTruthy();
    });

    it("should reject an invalid token", async () => {
      expect(() => service.verifyTeacherToken('bad-token')).toThrowError();
    })
  });

});