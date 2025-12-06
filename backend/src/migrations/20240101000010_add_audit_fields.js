exports.up = function (knex) {
  return Promise.all([
    // Users table
    knex.schema.table('users', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      table.enum('status', ['active', 'inactive', 'deleted']).defaultTo('active');
    }),

    // Blog table
    knex.schema.table('blog', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      table.enum('status', ['active', 'inactive', 'deleted']).defaultTo('active');
    }),

    // Faculty table
    knex.schema.table('faculty', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      table.enum('status', ['active', 'inactive', 'deleted']).defaultTo('active');
    }),

    // Gallery table
    knex.schema.table('gallery', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      table.enum('status', ['active', 'inactive', 'deleted']).defaultTo('active');
    }),

    // Announcements table
    knex.schema.table('announcements', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      table.enum('status', ['active', 'inactive', 'deleted']).defaultTo('active');
    }),

    // Admission dates table
    knex.schema.table('admission_dates', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      table.enum('status', ['active', 'inactive', 'deleted']).defaultTo('active');
    }),

    // Admission documents table
    knex.schema.table('admission_documents', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      table.enum('status', ['active', 'inactive', 'deleted']).defaultTo('active');
    }),

    // Admission applications table
    knex.schema.table('admission_applications', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      // Status already exists, just modify it
      table.dropColumn('status');
    }),
    knex.schema.table('admission_applications', (table) => {
      table.enum('status', ['active', 'inactive', 'deleted', 'pending', 'approved', 'rejected']).defaultTo('pending');
    }),

    // Curriculum table
    knex.schema.table('curriculum', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      table.enum('status', ['active', 'inactive', 'deleted']).defaultTo('active');
    }),

    // Class structure table
    knex.schema.table('class_structure', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      table.enum('status', ['active', 'inactive', 'deleted']).defaultTo('active');
    }),

    // Additional programs table
    knex.schema.table('additional_programs', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      table.enum('status', ['active', 'inactive', 'deleted']).defaultTo('active');
    }),

    // CBSE general info table
    knex.schema.table('cbse_general_info', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      table.enum('status', ['active', 'inactive', 'deleted']).defaultTo('active');
    }),

    // CBSE staff details table
    knex.schema.table('cbse_staff_details', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      table.enum('status', ['active', 'inactive', 'deleted']).defaultTo('active');
    }),

    // CBSE fee structure table
    knex.schema.table('cbse_fee_structure', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      table.enum('status', ['active', 'inactive', 'deleted']).defaultTo('active');
    }),

    // CBSE documents table
    knex.schema.table('cbse_documents', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      table.enum('status', ['active', 'inactive', 'deleted']).defaultTo('active');
    }),

    // CBSE infrastructure table
    knex.schema.table('cbse_infrastructure', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      table.enum('status', ['active', 'inactive', 'deleted']).defaultTo('active');
    }),

    // Contact submissions table
    knex.schema.table('contact_submissions', (table) => {
      table.integer('created_by_id').unsigned().nullable();
      table.string('created_by_name', 255).nullable();
      table.string('created_by_ip', 45).nullable();
      table.integer('updated_by_id').unsigned().nullable();
      table.string('updated_by_name', 255).nullable();
      table.string('updated_by_ip', 45).nullable();
      // Status already exists, just modify it
      table.dropColumn('status');
    }),
    knex.schema.table('contact_submissions', (table) => {
      table.enum('status', ['active', 'inactive', 'deleted', 'unread', 'read', 'replied']).defaultTo('unread');
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('blog', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('faculty', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('gallery', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('announcements', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('admission_dates', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('admission_documents', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('admission_applications', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('admission_applications', (table) => {
      table.string('status', 50).defaultTo('pending');
    }),
    knex.schema.table('curriculum', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('class_structure', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('additional_programs', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('cbse_general_info', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('cbse_staff_details', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('cbse_fee_structure', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('cbse_documents', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('cbse_infrastructure', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('contact_submissions', (table) => {
      table.dropColumn('created_by_id');
      table.dropColumn('created_by_name');
      table.dropColumn('created_by_ip');
      table.dropColumn('updated_by_id');
      table.dropColumn('updated_by_name');
      table.dropColumn('updated_by_ip');
      table.dropColumn('status');
    }),
    knex.schema.table('contact_submissions', (table) => {
      table.string('status', 50).defaultTo('unread');
    }),
  ]);
};
