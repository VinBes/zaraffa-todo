import { LOGIN_USER, LOGIN_USER_FAILED, LOGOUT_USER } from "./actions";

const initialState = {
  auth: false || localStorage.getItem("TodoLoginToken") != null,
  name: "",
};

export default function Authreducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        name: action.payload.username,
        auth: true,
      };
    case LOGIN_USER_FAILED:
      return state;
    case LOGOUT_USER:
      console.log(`reducer logging out`);
      return {
        name: "",
        auth: false,
      };
    default:
      return state;
  }
}
