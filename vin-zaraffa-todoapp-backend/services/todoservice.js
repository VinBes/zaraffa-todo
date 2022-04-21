class TodoService {
  constructor(knex) {
    this.knex = knex;
  }

  async gettodos(user) {
    try {
      let alltodos = await this.knex.select("*").from("todos").where({
        user_id: user.id,
      });
      if (alltodos.length > 0) {
        for (let index = 0; index < alltodos.length; index++) {
          const todo = alltodos[index];
          let todotags = await this.knex
            .select("*")
            .from("tags")
            .where({ content_id: todo.content_id });
          if (todotags.length > 0) {
            todo.tags = todotags;
          } else {
            todo.tags = [];
          }
        }
        console.log(alltodos);
      }
      return alltodos;
    } catch (error) {
      console.log(error, "while fetching all todos from database");
    }
  }

  async addtodo(user, todo) {
    console.log(todo.tags);
    console.log(user);
    try {
      let newTodo = await this.knex
        .returning("*")
        .insert({
          user_id: user.id,
          content: todo.content,
          today: todo.today,
          done: todo.done,
        })
        .into("todos");
      console.log(newTodo[0].content_id, "contentId");
      for (let index = 0; index < todo.tags.length; index++) {
        await this.knex
          .insert({
            tag_name: todo.tags[index].name,
            content_id: newTodo[0].content_id,
          })
          .into("tags");
      }
      let newTags = await this.knex
        .select("*")
        .from("tags")
        .where({ content_id: newTodo[0].content_id });
      newTodo[0].tags = newTags;
      console.log(`a todo has been added`);
      console.log(newTodo[0]);
      return newTodo[0];
    } catch (error) {
      console.log(error, "unable to add todo to database");
    }
  }

  async edittodo(todo, id) {
    try {
      let updated = await this.knex("todos")
        .update({
          content_id: id,
          content: todo.content,
        })
        .where({ content_id: id })
        .returning("*");
      return updated;
    } catch (error) {
      console.log(error, "unable to edit todo");
    }
  }

  async donetodo(done, id) {
    console.log(`value of done entering db`);
    console.log(done);
    try {
      let updated = await this.knex("todos")
        .update({
          done: done,
        })
        .where({ content_id: id })
        .returning("*");
      return updated;
    } catch (error) {
      console.log(error, "unable to set todo to done or viceversa");
    }
  }

  async deltodo(user, id) {
    let deletedTags = await this.knex("tags").where({ content_id: id }).del();
    let deleted = await this.knex("todos")
      .where({ content_id: id })
      .andWhere({ user_id: user.id })
      .del();
    return deleted;
  }

  async cleartodos() {
    await this.knex.select("*").from("tags").del();
    let todos = await this.knex.select("*").from("todos").del();
    return todos;
  }
}
module.exports = TodoService;
