import * as actionTypes from "../constants/action-types.js";

export const login = (currentUser) => {
  return {
    type: actionTypes.LOGIN,
    payload: currentUser,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
