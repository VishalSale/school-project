exports.up = function (knex) {
  return knex.schema.createTable('contact_submissions', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('phone', 50).notNullable();
    table.string('subject', 255).notNullable();
    table.text('message').notNullable();
    table.string('status', 50).defaultTo('unread');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('contact_submissions');
};
