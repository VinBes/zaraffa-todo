import { signupUserThunk } from "../Redux/auth/actions";
import UserForm from "./Userform";

function Signup() {
  return <UserForm name="signup" thunk={signupUserThunk}></UserForm>;
}

export default Signup;
