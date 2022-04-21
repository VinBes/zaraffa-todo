import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddTodoThunk } from "../Redux/todos/actions";
import { Container, Row, Col } from "react-bootstrap";

export default function AddNewTodo(props) {
  const [disabled, setDisabled] = useState(true);
  const [content, setContent] = useState("");
  const [done, setDone] = useState(false);
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const moment = useSelector((state) => state.todoStore.todos);

  useEffect(() => {
    if (content.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [content]);

  function submitTodo() {
    const newTodo = {
      content: content,
      moment: moment,
      done: done,
      tags: tags,
    };
    content.length > 0 && dispatch(AddTodoThunk(newTodo));
    setContent("");
    setDone(false);
    setTags([]);
  }

  function onTagChange(i, e) {
    console.log(`index`, i);
    console.log(`event`, e);
    const newTags = tags.slice();
    newTags[i] = {
      name: e.target.value,
    };
    setTags(newTags);
  }

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col xs={11}>
            <input
              className="addTodoInput"
              input="text"
              value={content}
              placeholder="Enter your todo here"
              name="text"
              onChange={(e) => setContent(e.target.value)}
            ></input>
          </Col>
          <Col xs={1}>
            <button
              disabled={disabled}
              className="addTodoButton"
              onClick={() => {
                submitTodo();
              }}
            >
              Create
            </button>
          </Col>
        </Row>
        <div>
          {props.tags && props.tags.length > 0
            ? props.tags.map((tag, i) => {
                <>
                  <input
                    key={i}
                    className="tagInput"
                    type="text"
                    value={tag.name}
                    onChange={(e) => onTagChange(i, e)}
                  ></input>
                </>;
              })
            : "No tags"}
          <button
            className="tagButton"
            onClick={() => setTags(tags.concat([{ name: "" }]))}
          >
            add tag
          </button>
        </div>
      </Container>
    </>
  );
}
