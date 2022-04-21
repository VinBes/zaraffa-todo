import {
  GET_TODOS,
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  CLEAR_TODOS,
} from "./actions";

const initialState = {
  todos: [],
  name: "",
};

export default function Todoreducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        todos: state.todos.concat(action.payload).sort((a, b) => a.id - b.id),
      };
    case ADD_TODO:
      return {
        todos: state.todos.concat([action.payload]),
      };
    case EDIT_TODO:
      const updatedTodo = action.payload[0];
      const index = state.todos.findIndex((i) => i.id === updatedTodo.id);
      state.todos.splice(index, 1, updatedTodo);
      return {
        todos: state.todos,
      };
    case DELETE_TODO:
      return {
        todos: state.todos.filter((todo) => {
          return todo.id !== action.payload;
        }),
      };
    case CLEAR_TODOS:
      return {
        todos: [],
      };
    default:
      return state;
  }
}
