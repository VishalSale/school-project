exports.up = function (knex) {
  return knex.schema.createTable('gallery', (table) => {
    table.increments('id').primary();
    table.string('category', 100).notNullable();
    table.string('title', 255).notNullable();
    table.text('url').notNullable();
    table.date('date').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('gallery');
};
