import { loginUserThunk, loginFacebookThunk } from "../Redux/auth/actions";
import UserForm from "./Userform";


function Login() {
  return <UserForm name="login" thunk={loginUserThunk}></UserForm>;
}

export default Login;
