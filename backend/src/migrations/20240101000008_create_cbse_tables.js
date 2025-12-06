exports.up = function (knex) {
  return knex.schema
    .createTable('cbse_general_info', (table) => {
      table.increments('id').primary();
      table.string('school_name', 255).notNullable();
      table.string('affiliation_no', 100).notNullable();
      table.string('school_code', 100).notNullable();
      table.text('address').notNullable();
      table.string('principal_name', 255).notNullable();
      table.string('principal_qualification', 255).notNullable();
      table.string('email', 255).notNullable();
      table.string('contact_number', 50).notNullable();
      table.string('campus_area', 100).notNullable();
      table.timestamps(true, true);
    })
    .createTable('cbse_staff_details', (table) => {
      table.increments('id').primary();
      table.integer('total_teaching').notNullable();
      table.integer('pgt').notNullable();
      table.integer('tgt').notNullable();
      table.integer('prt').notNullable();
      table.integer('non_teaching').notNullable();
      table.timestamps(true, true);
    })
    .createTable('cbse_fee_structure', (table) => {
      table.increments('id').primary();
      table.decimal('class_1_to_5', 10, 2).notNullable();
      table.decimal('class_6_to_8', 10, 2).notNullable();
      table.decimal('class_9_to_10', 10, 2).notNullable();
      table.decimal('class_11_to_12', 10, 2).notNullable();
      table.timestamps(true, true);
    })
    .createTable('cbse_documents', (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.text('url').notNullable();
      table.timestamps(true, true);
    })
    .createTable('cbse_infrastructure', (table) => {
      table.increments('id').primary();
      table.string('item', 255).notNullable();
      table.string('value', 255).notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('cbse_infrastructure')
    .dropTableIfExists('cbse_documents')
    .dropTableIfExists('cbse_fee_structure')
    .dropTableIfExists('cbse_staff_details')
    .dropTableIfExists('cbse_general_info');
};
