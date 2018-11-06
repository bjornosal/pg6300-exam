import { LOGIN_USER, LOGGED_IN_USER, LOGIN_SUCCESS } from "../actionTypes";

export const loginUser = (payload, history) => ({
    type: LOGIN_USER,
    payload,
    history
});

export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
});

export const loggedInuser = (payload) => ({
    type: LOGGED_IN_USER, 
    payload
})
