import {
  LOGIN_USER,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_LOGIN_STATUS
} from "../actionTypes";

const login = (state = [], action) => {
  switch (action.type) {
    case LOGIN_USER:
      console.log("LOGIN USER = START");
      return { ...state, loginError: false };
    case LOGIN_SUCCESS:
      // console.log(LOGIN_SUCCESS, action);
      return {
        ...state,
        loggedIn: true,
        user: {
          userId: action.payload.user_id,
          username: action.payload.username
        }
      };
    case LOGIN_ERROR:
      console.log(LOGIN_ERROR);
      return { ...state, loggedIn: false, loginError: true };
    case LOGOUT_SUCCESS:
      console.log(LOGOUT_SUCCESS);
      return { ...state, loggedIn: false };
    case UPDATE_LOGIN_STATUS:
      console.log(UPDATE_LOGIN_STATUS, action.payload);
      const loggedIn = action.payload.user !== undefined ? true : false;
      const user = action.payload.user !== undefined ? action.payload.user : undefined;

        return {
          ...state,
          loggedIn: loggedIn,
          user: user
        };
    default:
      return state;
  }
};

export default login;
