export function userStatus(request, response, next) {
  if (request.user) {
    return response.status(400).send({
      message: "User already logged in",
    });
  }

  next();
}
