exports.up = function (knex) {
  return knex.schema.createTable('announcements', (table) => {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.date('date').notNullable();
    table.string('category', 100).notNullable();
    table.boolean('is_pinned').defaultTo(false);
    table.text('content').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('announcements');
};
