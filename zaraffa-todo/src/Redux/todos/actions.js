import axios from "axios";

export const GET_TODOS = "GET_TODOS";
export const ADD_TODO = "ADD_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const CLEAR_TODOS = "CLEAR_TODOS";
export const TODAY_SWITCH = "TODAY_SWITCH";
export const DONE = "DONE";
export const GET_INFO = "GET_INFO";

export function GetTodos(todos) {
  return {
    type: GET_TODOS,
    payload: todos,
  };
}

export function AddTodo(todo) {
  return {
    type: ADD_TODO,
    payload: todo,
  };
}

export function EditTodo(todo) {
  return {
    type: EDIT_TODO,
    payload: todo,
  };
}

export function DeleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: id,
  };
}

export function ClearTodos() {
  return {
    type: CLEAR_TODOS,
  };
}

export function TodaySwitch(today) {
  return {
    type: TODAY_SWITCH,
    payload: today,
  };
}

export function doneTodo(done) {
  return {
    type: DONE,
    payload: done,
  };
}

//Thunk actions to interact with backend
export function GetTodosThunk() {
  return (dispatch) => {
    let token = localStorage.getItem("TodoLoginToken");
    return axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        return dispatch(GetTodos(response.data));
      });
  };
}

export function AddTodoThunk(todo) {
  console.log(`inside thunk`);
  console.log(todo);
  return (dispatch) => {
    let token = localStorage.getItem("TodoLoginToken");
    axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/api/todos`,
        {
          content: todo.content,
          done: todo.done,
          today: todo.today,
          tags: todo.tags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch(AddTodo(response.data));
      });
  };
}

export function EditTodoThunk(todo) {
  console.log(todo);
  return (dispatch) => {
    let token = localStorage.getItem("TodoLoginToken");
    axios
      .put(
        `${process.env.REACT_APP_API_SERVER}/api/todos`,
        {
          id: todo.id,
          content: todo.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(`response from backend`);
        console.log(response.data);
        dispatch(EditTodo(response.data));
      });
  };
}

export function DeleteTodoThunk(id) {
  console.log(`inside thunk`);
  console.log(id);
  return (dispatch) => {
    let token = localStorage.getItem("TodoLoginToken");
    axios
      .delete(`${process.env.REACT_APP_API_SERVER}/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(DeleteTodo(response.data));
      });
  };
}

export function ClearTodosThunk() {
  return (dispatch) => {
    let token = localStorage.getItem("TodoLoginToken");
    axios
      .delete(`${process.env.REACT_APP_API_SERVER}/api/todos/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(ClearTodos());
      });
  };
}

export function DoneThunk(done, id) {
  return (dispatch) => {
    let token = localStorage.getItem("TodoLoginToken");
    axios
      .put(
        `${process.env.REACT_APP_API_SERVER}/api/todos/done/`,
        {
          done: done,
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(`response from backend`);
        console.log(response.data);
        dispatch(doneTodo(response.data));
      });
  };
}
