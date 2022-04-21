import logo from "./Assets/Images/zaraffalogotransparantBig.png";

import AddNewTodo from "./Components/Addnewtodo";
import TodaySwitchComp from "./Components/TodaySwitchComp";
import Todolist from "./Components/Todolist";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import LogoutButton from "./Components/Logout";
import ClearButton from "./Components/ClearButton";

import { Routes, BrowserRouter, Link, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Navbar, NavItem } from "react-bootstrap";

function RequireAuth({ children }) {
  let isAuthenticated = useSelector((state) => state.authStore.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  let isAuthenticated = useSelector((state) => state.authStore.auth);
  const today = useSelector((state) => state.todoStore.today);
  const todosFromRedux = useSelector((state) => state.todoStore.todos);

  function todayFilter(today) {
    return todosFromRedux.filter((todo) => {
      if (today) {
        return todo.today == true;
      }
      if (!today) {
        return todo.today == false;
      }
    });
  }
  return (
    <>
      <BrowserRouter>
        <Container className="mainContainer">
          <Row className="d-flex flex-row justify-content-center">
            <Col lg={5}>
              <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/todos"
                  element={
                    <RequireAuth Navigate="/login">
                      <AddNewTodo></AddNewTodo>
                      <TodaySwitchComp />
                      <Todolist list={todayFilter(today)}></Todolist>
                    </RequireAuth>
                  }
                ></Route>
              </Routes>
            </Col>
          </Row>
          <Row className="d-flex text-center copyright">
            <Col>
              <p className="zaraffa copyright">
                Made by Vincent Besuyen &copy;{" "}
                <span>
                  <img className="zaraffa" src={logo}></img>
                </span>
              </p>
            </Col>
          </Row>
          <Row className="d-flex justify-content-evenly copyright text-center">
            <Col>
              {isAuthenticated ? <LogoutButton></LogoutButton> : null}
              <ClearButton className="ms-2">Clear all</ClearButton>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
