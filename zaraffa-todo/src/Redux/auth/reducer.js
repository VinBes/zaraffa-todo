import { LOGIN_USER, LOGOUT_USER } from "./actions";

const initialState = {
  auth: false || localStorage.getItem("TodoLoginToken") != null,
  name: "",
};

export default function Authreducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        name: action.payload,
        auth: true,
      };
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
