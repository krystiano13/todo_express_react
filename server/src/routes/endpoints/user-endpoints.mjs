import { User } from "../../database/schemas/user.mjs";
import { hashPassword } from "../../auth/hash.mjs";

export function userStatus(request, response) {
  return request.user
    ? response.status(200).send({ user: request.session.passport.user })
    : response.status(401).send({ error: "User not logged in" });
}

export function logIn(request, response) {
  response.status(200);
  return response.send({ message: "Logged In" });
}

export async function register(request, response) {
  const existingUser = await User.findOne({ email: request.body.email });
  if (existingUser) {
    return response.status(400).send({
      message: "User already exists",
    });
  }

  const user = new User({
    email: request.body.email,
    username: request.body.username,
    password: hashPassword(request.body.password),
  });

  try {
    const saveUser = await user.save();
    response.status(200);
    return response.send({
      user: saveUser.email,
      message: "User created successfully",
    });
  } catch (e) {
    return response.status(500).send({
      message: "Internal server error",
    });
  }
}
