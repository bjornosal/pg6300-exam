import { LOGIN_USER, LOGGED_IN_USER } from "../actionTypes";

export const loginUser = (payload) => ({
    type: LOGIN_USER,
    payload
});

export const loggedInuser = (payload) => ({
    type: LOGGED_IN_USER, 
    payload
})
