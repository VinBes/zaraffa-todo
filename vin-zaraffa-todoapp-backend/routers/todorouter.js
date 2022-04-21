class TodoRouter {
  constructor(todoService, auth, express) {
    this.todoService = todoService;
    this.auth = auth;
    this.express = express;
  }

  router() {
    let router = this.express.Router();

    router.get("/todos", this.auth.authenticate(), this.gettodos.bind(this));
    router.post("/todos", this.auth.authenticate(), this.addtodo.bind(this));
    router.put("/todos/", this.auth.authenticate(), this.edittodo.bind(this));
    router.delete(
      "/todos/:id",
      this.auth.authenticate(),
      this.deltodo.bind(this)
    );
    return router;
  }

  gettodos(req, res) {
    console.log(`reached todo router`);
    let user = req.user[0];
    return this.todoService.gettodos(user).then((todos) => {
      res.send(todos);
    });
  }

  addtodo(req, res) {
    let user = req.user[0];
    let todo = req.body.todo;
    return this.todoService.addtodo(user, todo).then((todo) => {
      res.send(todo);
    });
  }

  edittodo(req, res) {
    let user = req.user[0];
    let todo = req.body.todo;
    let id = req.body.id;
    return this.todoService
      .edittodo(user, todo, id)
      .then((todo) => res.send(JSON.stringify(todo)));
  }

  deltodo(req, res) {
    let user = req.user[0];
    let id = req.params.id;
    return this.todoService.deltodo(user, id).then(() => res.send(id));
  }
}

module.exports = TodoRouter;
