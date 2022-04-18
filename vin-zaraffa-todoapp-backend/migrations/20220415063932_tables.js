/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
    })
    .then(() => {
      return knex.schema
        .createTable("todos", (table) => {
          table.increments("content_id").primary();
          table.string("content").notNullable();
          table.string("moment").notNullable();
          table.integer("user_id").unsigned();
          table.foreign("user_id").references("users.id");
        })
        .then(() => {
          return knex.schema.createTable("tags", (table) => {
            table.increments("tag_id").primary();
            table.string("tag_name");
            table.integer("content_id").unsigned();
            table.foreign("content_id").references("todos.content_id");
          });
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tags").then(() => {
    return knex.schema.dropTable("todos").then(() => {
      return knex.schema.dropTable("users");
    });
  });
};
