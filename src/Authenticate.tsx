import { useContext, useEffect } from "react";
import { authenticate } from "./firebase";
import { UserContext, UserActionType } from "./UserContext";

export const Authenticate = () => {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const action = async () => {
      const { user, token } = await authenticate();

      const payload = { uid: user?.uid, token };

      dispatch({ type: UserActionType.AUTHENTICATE, payload });
    };

    action();
  }, [dispatch]);
  return <p></p>;
};
