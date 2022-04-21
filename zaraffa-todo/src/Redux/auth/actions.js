import axios from "axios";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

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

export const loginUserThunk = (username, email, password) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/auth/login`, {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data === null) {
          console.log(`login failed`);
        } else {
          localStorage.setItem("TodoLoginToken", response.data.token);
          dispatch({ type: LOGIN_USER });
        }
      });
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
