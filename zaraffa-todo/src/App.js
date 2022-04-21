import AddNewTodo from "./Components/Addnewtodo";
import TodaySwitch from "./Components/TodaySwitch";
import Todolist from "./Components/Todolist";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import LogoutButton from "./Components/Logout";

import { Routes, BrowserRouter, Link, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Navbar, NavItem } from "react-bootstrap";

function RequireAuth({ children }) {
  let isAuthenticated = useSelector((state) => state.authStore.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  let isAuthenticated = useSelector((state) => state.authStore.auth);
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar>
            {isAuthenticated ? (
              <Container>
                <NavItem>
                  <LogoutButton></LogoutButton>
                </NavItem>
              </Container>
            ) : (
              <Container>
                <NavItem>
                  <Link to="/">Signup</Link>
                </NavItem>
                <NavItem>
                  <Link to="/login">Login</Link>
                </NavItem>
                <NavItem>
                  <Link to="/todos">Todos</Link>
                </NavItem>
              </Container>
            )}
          </Navbar>

          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/todos"
              element={
                <RequireAuth Navigate="/login">
                  <AddNewTodo></AddNewTodo>
                  <TodaySwitch />
                  <Todolist></Todolist>
                </RequireAuth>
              }
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
