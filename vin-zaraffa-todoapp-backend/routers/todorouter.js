class TodoRouter {
  constructor(todoService, authClass, express) {
    this.todoService = todoService;
    this.authClass = authClass;
    this.express = express;
  }

  router() {
    let router = this.express.Router();

    router.get(
      "/todos",
      this.authClass.authenticate(),
      this.gettodos.bind(this)
    );
    router.post(
      "/todos",
      this.authClass.authenticate(),
      this.addtodo.bind(this)
    );
    router.put(
      "/todos/",
      this.authClass.authenticate(),
      this.edittodo.bind(this)
    );
    router.delete(
      "/todos/:id",
      this.authClass.authenticate(),
      this.deltodo.bind(this)
    );
    return router;
  }

  gettodos(req, res) {
    let user = req.user[0];
    return this.todoService.gettodos(user).then((todos) => {
      res.send(todos);
    });
  }

  addtodo(req, res) {
    let user = req.user[0];
    let todo = req.body.todo;
    return this.todoService
      .addtodo(user, todo)
      .then(() => {
        return this.todoService.gettodos(user);
      })
      .then((todos) => {
        res.send(todos);
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
