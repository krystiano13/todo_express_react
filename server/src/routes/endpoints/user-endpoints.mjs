import { User } from "../../database/schemas/user.mjs";
import { hashPassword } from "../auth/hash.mjs";

export function userStatus(request, response) {
  return request.user ? response.sendStatus(200) : response.sendStatus(401);
}

export function logIn(request, response) {
  return response.status(200).send({ message: "Logged In" });
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
    return response.status(200).send({
      user: saveUser.email,
      message: "User created successfully",
    });
  } catch (e) {
    return response.status(500).send({
      message: "Internal server error",
    });
  }
}
