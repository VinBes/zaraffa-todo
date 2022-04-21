import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Modal, ModalBody } from "react-bootstrap";

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
      <Modal show="true">
        <Modal.Title className="text-center">
          <h2 className="formTitle mt-2">{props.name}</h2>
        </Modal.Title>
        <hr></hr>
        <Form>
          <Modal.Body>
            <FormGroup>
              {props.signup ? (
                <>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                    value={info.username}
                    onChange={(e) => handleChange(e)}
                  />
                </>
              ) : null}
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={info.email}
                onChange={(e) => handleChange(e)}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={info.password}
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                info.email.length > 0 &&
                  info.password.length > 0 &&
                  dispatch(
                    props.signup
                      ? props.thunk(info.username, info.email, info.password)
                      : props.thunk(info.email, info.password)
                  );
                navigate("/login");
                // props.signup &&
                //   info.username.length > 0 &&
                //   info.email.length > 0 &&
                //   info.password.length > 0 &&
              }}
            >
              {props.name}
            </Button>

            {props.name == "signup" ? (
              <Button
                variant="primary"
                onClick={(e) => {
                  navigate("/login");
                }}
              >
                Go to Login
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={(e) => {
                  navigate("/");
                }}
              >
                New User
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default UserForm;
