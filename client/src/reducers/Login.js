import { LOGIN_USER } from "../actionTypes";

const login = (state = [], action) => {
  switch (action.type) {
    case LOGIN_USER:
      console.log("REDUCED", "USER");
      return [...state, {}];

    default:
      return state;
  }
};

export default login;