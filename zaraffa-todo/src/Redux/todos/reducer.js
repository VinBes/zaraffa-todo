import {
  GET_TODOS,
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  CLEAR_TODOS,
  TODAY_SWITCH,
  DONE,
} from "./actions";

const initialState = {
  todos: [],
  name: "",
  today: true,
};

export default function Todoreducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        todos: action.payload,
        name: state.name,
        today: state.today,
      };
    case ADD_TODO:
      return {
        todos: state.todos.concat([action.payload]),
        name: state.name,
        today: state.today,
      };
    case EDIT_TODO:
      const updatedTodo = action.payload[0];
      const index = state.todos.findIndex(
        (i) => i.content_id === updatedTodo.content_id
      );
      state.todos.splice(index, 1, updatedTodo);
      return {
        todos: state.todos,
        name: state.name,
        today: state.today,
      };
    case DELETE_TODO:
      return {
        todos: state.todos.filter((todo) => {
          return todo.content_id !== action.payload;
        }),
        name: state.name,
        today: state.today,
      };
    case CLEAR_TODOS:
      return {
        todos: [],
        name: state.name,
        today: state.today,
      };
    case TODAY_SWITCH:
      return {
        todos: state.todos,
        name: state.name,
        today: action.payload,
      };
    case DONE:
      const updatedDoneTodo = action.payload[0];
      const indexDone = state.todos.findIndex(
        (i) => i.content_id === updatedDoneTodo.content_id
      );
      state.todos.splice(indexDone, 1, updatedDoneTodo);
      return {
        todos: state.todos,
        name: state.name,
        today: state.today,
      };
    default:
      return state;
  }
}
