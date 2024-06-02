import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { unauthorized } from "../utils/auth";

export function Home() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  useEffect(() => {
    unauthorized(userContext, () => navigate("/login"));
  }, []);

  return <></>;
}
