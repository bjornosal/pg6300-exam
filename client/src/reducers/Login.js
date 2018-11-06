import { LOGIN_USER, LOGIN_ERROR, LOGIN_SUCCESS } from "../actionTypes";

const login = (state = [], action) => {
  switch (action.type) {
    case LOGIN_USER:
      console.log("LOGIN USER = START");
      return [...state, {}];
    case LOGIN_SUCCESS:
    console.log("LOGIN SUCESS");
    return [...state, {}];
    case LOGIN_ERROR:
      console.log("LOGIN ERROR");
      return [...state, {}]
    default:
      return state;
  }
};

export default login;