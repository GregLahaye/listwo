import { createContext, Dispatch } from "react";
import { LocalStorage, LocalStorageKey } from "./local-storage";

/* User Interface */
interface IUser {
  uid?: string;
  token?: string;
}

/* Reducer Actions */
export enum UserActionType {
  AUTHENTICATE,
}

interface AuthenticateAction {
  type: typeof UserActionType.AUTHENTICATE;
  payload: IUser;
}

type UserActionTypes = AuthenticateAction;

/* initial user state */
export const initial: IUser = {
  uid: LocalStorage.get(LocalStorageKey.UID),
  token: LocalStorage.get(LocalStorageKey.TOKEN),
};

/* User Context */
export const UserContext = createContext<{
  state: IUser;
  dispatch: Dispatch<UserActionTypes>;
}>({
  state: initial,
  dispatch: () => initial,
});

/* User Reducer */
export const userReducer = (state: IUser, action: UserActionTypes) => {
  switch (action.type) {
    case UserActionType.AUTHENTICATE: {
      // take values from payload
      const { uid, token } = action.payload;

      // set items in local storage
      localStorage.setItem(LocalStorageKey.UID, JSON.stringify(uid));
      localStorage.setItem(LocalStorageKey.TOKEN, JSON.stringify(token));

      return {
        ...state,
        uid,
        token,
      };
    }

    default:
      return state;
  }
};
