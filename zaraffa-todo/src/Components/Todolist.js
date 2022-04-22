import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  Container,
  Row,
  Col,
  Badge,
  ModalBody,
  Modal,
  ModalFooter,
  Button,
  ModalTitle,
} from "react-bootstrap";

import {
  GetTodosThunk,
  EditTodoThunk,
  DeleteTodoThunk,
  DoneThunk,
  ClearTodosThunk,
} from "../Redux/todos/actions";

export default function Todolist(props) {
  const [tagModal, showTagModal] = useState(false);
  const [done, setDone] = useState(false);
  const name = useSelector((state) => state.authStore.name);
  const today = useSelector((state) => state.todoStore.today);
  const [updatedContent, setUpdatedContent] = useState("");
  const todosFromRedux = useSelector((state) => state.todoStore.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTodosThunk());
  }, [done]);

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

  const handleDone = (done, id) => {
    dispatch(DoneThunk(done, id));
  };

  //Future function will be to use a modal to edit the tags, the underneath code is used to capture the change in the input fields
  // function onTagChange(i, e, oldTags) {
  //   console.log(`index`, i);
  //   console.log(`event`, e);
  //   const newUpdatedTags = oldTags.slice();
  //   newUpdatedTags[i] = {
  //     name: e.target.value,
  //   };
  //   setUpdatedTags(newUpdatedTags);
  // }

  return (
    <>
      <div className="container-fluid">
        <h3>Welcome back {name}</h3>
      </div>
      <div>
        {props.list && props.list.length >= 1
          ? props.list.map((todo, i) => (
              <div
                key={todo.content_id}
                className={todo.done ? "doneTodo" : "notdoneTodo"}
              >
                <Row className="justify-content-center">
                  <Col xs={1}>
                    <input
                      type="checkbox"
                      defaultChecked={todo.done}
                      onClick={() => handleDone(!todo.done, todo.content_id)}
                    ></input>
                  </Col>
                  <Col xs={9}>
                    <input
                      type="text"
                      defaultValue={todo.content}
                      onChange={(e) => setUpdatedContent(e.target.value)}
                      onBlur={(e) => {
                        editTodoContent(todo.content_id);
                      }}
                    ></input>
                    <div className="d-flex flex-wrap">
                      {todo.tags && todo.tags.length >= 1
                        ? todo.tags.map((tag) => (
                            <Badge key={tag.tag_id} className="badges">
                              {tag.tag_name}
                            </Badge>
                          ))
                        : "No tags"}
                    </div>
                  </Col>
                  <Col xs={2}>
                    <button onClick={() => showTagModal(!tagModal)}>
                      tags
                    </button>
                    <button
                      className="deleteButton"
                      onClick={(e) =>
                        dispatch(DeleteTodoThunk(todo.content_id))
                      }
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
