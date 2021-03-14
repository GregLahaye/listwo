import { useContext } from "react";
import { Navigate, Route, RouteProps, useLocation } from "react-router";
import { UserContext } from "./UserContext";

export const AnonymousRoute = ({ path, element }: RouteProps) => {
  const { state } = useContext(UserContext);

  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const toUrl = params.get("to") || "/lists";

  return (
    <Route
      path={path}
      element={!state.token ? element : <Navigate to={toUrl}></Navigate>}
    ></Route>
  );
};
