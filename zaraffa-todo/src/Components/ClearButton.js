import { ClearTodosThunk } from "../Redux/todos/actions";
import { useDispatch } from "react-redux";

export default function ClearButton() {
  let dispatch = useDispatch();

  return <button onClick={() => dispatch(ClearTodosThunk())}>Clear all</button>;
}
