export function userNotLoggedIn(request, response, next) {
  if (request.user) {
    return response.status(400).send({
      message: "User already logged in",
    });
  }

  next();
}

export function userLoggedIn(request, response, next) {
  if (!request.user) {
    return response.status(400).send({
      message: "User not logged in",
    });
  }
  next();
}
