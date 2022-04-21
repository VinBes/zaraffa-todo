import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup } from "react-bootstrap";

function UserForm(props) {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.authStore.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todos");
    }
  }, [isAuthenticated]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  return (
    <>
      <Form>
        <h2>{props.name}</h2>
        <FormGroup>
          <Form.Label for="username">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            value={info.username}
            onChange={(e) => handleChange(e)}
          />
          <Form.Label for="email">Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={info.email}
            onChange={(e) => handleChange(e)}
          />
          <Form.Label for="password">Password</Form.Label>
          <Form.Control
            type="text"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={info.password}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            info.username.length > 0 &&
              info.email.length > 0 &&
              info.password.length > 0 &&
              dispatch(
                props.signup
                  ? props.thunk(info.username, info.email, info.password)
                  : props.thunk(info.username, info.email, info.password)
              );
            props.signup &&
              info.username.length > 0 &&
              info.email.length > 0 &&
              info.password.length > 0 &&
              navigate("/login");
          }}
        >
          {props.name}
        </Button>
      </Form>
    </>
  );
}

export default UserForm;
