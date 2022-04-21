import axios from "axios";

export const GET_TODOS = "GET_TODOS";
export const ADD_TODO = "ADD_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const CLEAR_TODOS = "CLEAR_TODOS";

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

//Thunk actions to interact with backend
export function GetTodosThunk() {
  return (dispatch) => {
    let token = localStorage.getItem("TodoLoginToken");
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(GetTodos(response.data));
      });
  };
}

export function AddTodoThunk(todo) {
  return (dispatch) => {
    let token = localStorage.getItem("TodoLoginToken");
    axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/api/todos`,
        {
          content: todo.content,
          moment: todo.moment,
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
  return (dispatch) => {
    let token = localStorage.getItem("TodoLoginToken");
    axios
      .put(
        `${process.env.REACT_APP_API_SERVER}/api/todos`,
        {
          id: todo.id,
          content: todo.content,
          moment: todo.moment,
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
        dispatch(EditTodo(response.data));
      });
  };
}

export function DeleteTodoThunk(id) {
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
      .then((response) => {
        console.log(response.data);
        dispatch(ClearTodos());
      });
  };
}
