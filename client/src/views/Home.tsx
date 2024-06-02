import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";

export function Home() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!userContext.LoggedIn.loggedIn) {
      navigate("/login");
    }
  }, []);

  return <></>;
}
