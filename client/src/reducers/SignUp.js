import { SIGN_UP_ERROR, SIGN_UP_SUCCESS, SIGN_UP_USER } from "../actionTypes";

const signUp = (state = [], action) => {
  switch (action.type) {
    case SIGN_UP_USER:
      console.log(SIGN_UP_USER);
      return {
        ...state,
        loginError: false,
        errorMsg: undefined
      };
    case SIGN_UP_ERROR:
      console.log(SIGN_UP_ERROR);
      return {
        ...state,
        loginError: true,
        errorMsg: action.payload ? action.payload.errorMsg : undefined
      };
    case SIGN_UP_SUCCESS:
      console.log(SIGN_UP_SUCCESS);
      return {
        ...state,
        loginError: false
      };
    default:
      return state;
  }
};

export default signUp;
