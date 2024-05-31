import { validationResult } from "express-validator";

export function handleErrors(request, response, next) {
  const result = validationResult(request);

  if (!result.isEmpty()) {
    return response.status(400).json({ errors: result.array() });
  }

  next();
}
