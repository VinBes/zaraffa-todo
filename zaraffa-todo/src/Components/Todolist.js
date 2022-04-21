import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Container, Row, Col } from "react-bootstrap";

import {
  GetTodosThunk,
  EditTodoThunk,
  DeleteTodoThunk,
  ClearTodosThunk,
} from "../Redux/todos/actions";

export default function Todolist() {
  const [content, setContent] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [tags, setTags] = useState([]);

  const todosFromRedux = useSelector((state) => state.todoStore.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTodosThunk());
  }, []);

  const editTodoContent = (id) => {
    updatedContent.length > 0 &&
      dispatch(
        EditTodoThunk({
          id: id,
          content: updatedContent,
        })
      );
    setUpdatedContent("");
  };

  return (
    <>
      <div className="container-fluid">
        <h3>Welcome back </h3>
      </div>
      <div>
        {todosFromRedux && todosFromRedux.length >= 1
          ? todosFromRedux.map((todo) => (
              <div key={todo.id}>
                <Row className="justify-content-center">
                  <Col xs={1}>
                    <input type="checkbox"></input>
                  </Col>
                  <Col xs={9}>
                    <input
                      id={todo.id}
                      type="text"
                      value={todo.content}
                      onChange={(e) => setUpdatedContent(e.target.value)}
                      onBlur={(e) => {
                        editTodoContent(todo.id);
                      }}
                    ></input>
                  </Col>
                  <Col xs={2}>
                    <button>tags</button>
                    <button
                      className="deleteButton"
                      onClick={(e) => dispatch(DeleteTodoThunk(todo.id))}
                    >
                      delete
                    </button>
                  </Col>
                </Row>
              </div>
            ))
          : null}
      </div>
    </>
  );
}
