import * as actionTypes from './actionTypes';
import axios from 'axios';

const BASE_API_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const API_KEY = '?key=AIzaSyA_bLWqGlT1OmxFyQyOEnmImoj-JC2LeEk';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error
  }
};

export const checkoutAuthTimeout = (expTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expTime * 1000);
  }
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = `${BASE_API_URL}/signupNewUser${API_KEY}`;
    if (!isSignup) {
      url = `${BASE_API_URL}/verifyPassword${API_KEY}`;
    }

    axios.post(url, authData)
    .then(response => {
      const expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expDate', expDate);
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkoutAuthTimeout(response.data.expiresIn));
    })
    .catch(error => {
      dispatch(authFail(error.response.data.error));
    })
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
};

export const authCheckState = () => {
  return  dispatch =>{
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expDate = new Date(localStorage.getItem('expDate'));
      if (expDate <=  new Date()){
        dispatch(logout());
      } else {
        const userId =  localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkoutAuthTimeout((expDate.getTime() - new Date().getTime())/1000));
      }

    }
  }
};
