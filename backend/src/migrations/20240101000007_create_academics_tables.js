exports.up = function (knex) {
  return knex.schema
    .createTable('curriculum', (table) => {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.text('subjects').notNullable();
      table.text('description').notNullable();
      table.string('icon', 100).notNullable();
      table.timestamps(true, true);
    })
    .createTable('class_structure', (table) => {
      table.increments('id').primary();
      table.string('level', 255).notNullable();
      table.string('grades', 100).notNullable();
      table.text('focus').notNullable();
      table.timestamps(true, true);
    })
    .createTable('additional_programs', (table) => {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.text('description').notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('additional_programs')
    .dropTableIfExists('class_structure')
    .dropTableIfExists('curriculum');
};
