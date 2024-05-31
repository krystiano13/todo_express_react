import { userStatus, logIn } from "../routes/endpoints/user-endpoints.mjs";

const mockRequest = {
  user: "testUser",
  body: {
    email: "testEmail@test.pl",
  },
};

const mockResponse = {
  status: jest.fn(),
  send: jest.fn(),
  sendStatus: jest.fn(),
};

describe("users", () => {
  it("should return 200 when user is logged in", () => {
    userStatus(mockRequest, mockResponse);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
  });
  it("should return 401 when user is not logged in", () => {
    userStatus({}, mockResponse);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(401);
  });
  it("should return 200 when called (logIn)", () => {
    logIn(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith({ message: "Logged In" });
  });
});
