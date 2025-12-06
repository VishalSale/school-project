exports.up = function (knex) {
  return knex.schema.createTable('faculty', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('position', 255).notNullable();
    table.string('qualification', 255).notNullable();
    table.string('experience', 100).notNullable();
    table.string('email', 255).notNullable();
    table.text('image');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('faculty');
};
