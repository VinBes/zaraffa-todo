import axios from "axios";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}

export function loginFailureAction(message) {
  return {
    type: LOGIN_USER_FAILED,
    message: message,
  };
}

export const signupUserThunk = (username, email, password) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/auth/signup`, {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(`Signup completed`);
        console.log(response);
      });
  };
};

export const loginUserThunk = (email, password) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_SERVER}/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data === null) {
          dispatch(loginFailureAction("Unable to Login"));
        } else if (!response.data.userInfo.token) {
          dispatch(loginFailureAction("Unable to Login, no token"));
        } else {
          localStorage.setItem("TodoLoginToken", response.data.userInfo.token); // will it also work if I set the entire userInfo object there? this would allow for persisting the userInfo and thus the name
          dispatch(loginUser(response.data.userInfo.user));
        }
      })
      .catch((error) => console.log("Error loging in: ", error));
  };
};

export const loginFacebookThunk = (data) => {
  return (dispatch) => {
    console.log(data);
    return axios
      .post(`${process.env.REACT_APP_API_SERVER}/auth/login/facebook`, {
        info: data,
      })
      .then((response) => {
        if (response.data == null) {
          dispatch(loginFailureAction("Unable to  login using facebook"));
        } else if (!response.data.userInfo.token) {
          dispatch(loginFailureAction("No token from facebook"));
        } else {
          localStorage.setItem("TodoLoginToken", response.data.userInfo.token);
          dispatch(loginUser(response.data.userInfo.user));
        }
      })
      .catch((error) => console.log("Error loging in with facebook: ", error));
  };
};

export const logoutThunk = () => {
  console.log(`inside logoutThunk`);
  return (dispatch) => {
    console.log(`dispatching a logout`);
    localStorage.removeItem("TodoLoginToken");
    dispatch({
      type: LOGOUT_USER,
    });
  };
};
