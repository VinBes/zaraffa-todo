import { logoutThunk } from "../Redux/auth/actions";

import { useDispatch } from "react-redux";

export default function LogoutButton() {
  let dispatch = useDispatch();

  return <button onClick={() => dispatch(logoutThunk())}>Logout</button>;
}
