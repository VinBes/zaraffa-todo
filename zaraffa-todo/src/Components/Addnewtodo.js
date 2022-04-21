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
  const today = useSelector((state) => state.todoStore.today);

  useEffect(() => {
    if (content.length >= 1) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [content]);

  function submitTodo() {
    const newTodo = {
      content: content,
      done: done,
      today: today,
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
          {tags && tags.length > 0
            ? tags.map((tag, i) => (
                <input
                  key={i}
                  type="text"
                  defaultValue={tag.name}
                  onChange={(e) => onTagChange(i, e)}
                ></input>
              ))
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
