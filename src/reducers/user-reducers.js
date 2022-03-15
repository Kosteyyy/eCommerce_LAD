import * as actionTypes from "../constants/action-types.js";

const initialUser = {
  isLoggedIn: false,
  currenUserId: null,
  currentUserName: null,
  currentUserRole: null,
};

export const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        isLoggedIn: true,
        currentUserId: action.payload.currentUserId,
        currentUserName: action.payload.currentUserName,
        currentUserRole: action.payload.currentUserRole,
      };

    case actionTypes.LOGOUT:
      return initialUser;

    default:
      return state;
  }
};
