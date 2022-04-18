const express = require("express");
const cors = require("cors");

const knexfile = require("./knexfile").development;
const knex = require("knex")(knexfile);

const auth = require("./auth/auth")(knex);

const app = express();
let port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(auth.initialize());

const TodoRouter = require("./routers/todorouter");
const TodoService = require("./services/todoservice");
const AuthRouter = require("./routers/authrouter");

const todoService = new TodoService(knex);

app.use("/api", new TodoRouter(todoService, auth, express).router());
app.use("/auth", new AuthRouter(express, knex).router());

app.listen(port, () => {
  console.log(`Todo backend application listening on ${port}`);
});
