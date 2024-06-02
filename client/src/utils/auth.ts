import type { UserContext } from "../types/user";

export function unauthorized(userContext: UserContext, navigate: () => void) {
  if (!userContext.LoggedIn.loggedIn) {
    navigate();
  }
}

export function authorized(userContext: UserContext, navigate: () => void) {
  if (userContext.LoggedIn.loggedIn) {
    navigate();
  }
}
