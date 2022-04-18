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
      let todos = await this.knex
        .select("*")
        .from("todos")
        .where({ user_id: user.id });
      let contentId = await this.knex
        .returning("content_id")
        .insert({
          user_id: user.id,
          content: todo.content,
          moment: todo.moment,
        })
        .into("todos");
      console.log(contentId, "contentId");
      for (let index = 0; index < todo.tags.length; index++) {
        await this.knex
          .insert({
            tag_name: todo.tags[index].name,
            content_id: contentId[0].content_id,
          })
          .into("tags");
      }
      console.log(`a todo has been added`);
    } catch (error) {
      console.log(error, "unable to add todo to database");
    }
  }

  async edittodo(user, todo, id) {
    try {
      let updated = await this.knex("todos")
        .update({
          content_id: id,
          content: todo.content,
          moment: todo.moment,
          user_id: user.id,
        })
        .where({ id: id })
        .returning("*");
      let updatedTags = await this.knex("tags").update({});
      return updated;
    } catch (error) {
      console.log(error, "unable to edit todo");
    }
  }

  async deltodo(user, id) {
    let deleted = await this.knex("todos")
      .where({ content_id: id })
      .andWhere({ user_id: user.id })
      .del();
    return deleted;
  }
}
module.exports = TodoService;
