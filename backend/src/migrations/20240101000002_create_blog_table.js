exports.up = function (knex) {
  return knex.schema.createTable('blog', (table) => {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.string('category', 100).notNullable();
    table.date('date').notNullable();
    table.string('author', 255).notNullable();
    table.text('image');
    table.text('excerpt').notNullable();
    table.text('content').notNullable();
    table.boolean('published').defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('blog');
};
