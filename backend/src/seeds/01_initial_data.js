const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  // Clear existing data
  await knex('users').del();
  await knex('cbse_general_info').del();
  await knex('cbse_staff_details').del();
  await knex('cbse_fee_structure').del();

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Insert admin user
  await knex('users').insert([
    {
      email: 'admin@brightfutureschool.edu',
      password: hashedPassword,
      role: 'admin',
    },
  ]);

  // Insert CBSE general info (single row)
  await knex('cbse_general_info').insert([
    {
      school_name: 'Bright Future School',
      affiliation_no: '1234567',
      school_code: '12345',
      address: '123 Keshav nagar, Pune, Maharashtra-411004',
      principal_name: 'Dr. Vishal Sale',
      principal_qualification: 'Ph.D. in Education',
      email: 'principal@brightfuture.edu',
      contact_number: '+91 123 456 7890',
      campus_area: '5 Acres',
    },
  ]);

  // Insert CBSE staff details (single row)
  await knex('cbse_staff_details').insert([
    {
      total_teaching: 50,
      pgt: 25,
      tgt: 40,
      prt: 35,
      non_teaching: 10,
    },
  ]);

  // Insert CBSE fee structure (single row)
  await knex('cbse_fee_structure').insert([
    {
      class_1_to_5: 50000,
      class_6_to_8: 60000,
      class_9_to_10: 70000,
      class_11_to_12: 80000,
    },
  ]);

  console.log('✅ Seed data inserted successfully!');
  console.log('📧 Admin Email: admin@school.com');
  console.log('🔑 Admin Password: password123');
};
