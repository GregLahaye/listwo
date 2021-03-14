import { useContext, useEffect } from "react";
import { authenticate } from "./firebase";
import { UserContext, UserActionType } from "./UserContext";

export const Authenticate = () => {
  const { dispatch } = useContext(UserContext);

  const action = async () => {
    const { user, token } = await authenticate();

    const payload = { uid: user?.uid, token };

    dispatch({ type: UserActionType.AUTHENTICATE, payload });
  };

  useEffect(() => {
    action();
  }, []);
  return <p></p>;
};
