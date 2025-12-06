exports.up = function (knex) {
  return knex.schema
    .createTable('admission_dates', (table) => {
      table.increments('id').primary();
      table.string('label', 255).notNullable();
      table.date('date').notNullable();
      table.timestamps(true, true);
    })
    .createTable('admission_documents', (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.timestamps(true, true);
    })
    .createTable('admission_applications', (table) => {
      table.increments('id').primary();
      table.string('student_name', 255).notNullable();
      table.date('student_dob').notNullable();
      table.string('student_gender', 50).notNullable();
      table.string('class_applying', 100).notNullable();
      table.string('previous_school', 255);
      table.string('parent_name', 255).notNullable();
      table.string('parent_email', 255).notNullable();
      table.string('parent_phone', 50).notNullable();
      table.text('address').notNullable();
      table.string('status', 50).defaultTo('pending');
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('admission_applications')
    .dropTableIfExists('admission_documents')
    .dropTableIfExists('admission_dates');
};
