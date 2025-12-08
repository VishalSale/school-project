exports.up = async function (knex) {

  // Helper: add audit fields + status
  const addAuditFields = async (tableName, statusEnum, defaultStatus) => {
    await knex.schema.table(tableName, (table) => {
      table.integer('created_by_id').nullable()
      table.string('created_by_name', 255).nullable()
      table.string('created_by_ip', 45).nullable()
      table.integer('updated_by_id').nullable()
      table.string('updated_by_name', 255).nullable()
      table.string('updated_by_ip', 45).nullable()
    })

    const hasStatus = await knex.schema.hasColumn(tableName, 'status')

    if (hasStatus) {
      await knex.schema.table(tableName, (table) => {
        table.dropColumn('status')
      })
    }

    await knex.schema.table(tableName, (table) => {
      table
        .enu('status', statusEnum)
        .defaultTo(defaultStatus)
    })
  }

  // Common status
  const basicStatus = ['active', 'inactive', 'deleted']

  // Tables with basic status
  const basicTables = [
    'users',
    'blog',
    'faculty',
    'gallery',
    'announcements',
    'admission_dates',
    'admission_documents',
    'curriculum',
    'class_structure',
    'additional_programs',
    'cbse_general_info',
    'cbse_staff_details',
    'cbse_fee_structure',
    'cbse_documents',
    'cbse_infrastructure'
  ]

  for (const table of basicTables) {
    await addAuditFields(table, basicStatus, 'active')
  }

  // Admission Applications (extended status)
  await addAuditFields(
    'admission_applications',
    ['active', 'inactive', 'deleted', 'pending', 'approved', 'rejected'],
    'pending'
  )

  // Contact submissions (custom status)
  await addAuditFields(
    'contact_submissions',
    ['active', 'inactive', 'deleted', 'unread', 'read', 'replied'],
    'unread'
  )
}

exports.down = async function (knex) {

  const removeAuditFields = async (tableName, restoreStatus, defaultStatus) => {
    await knex.schema.table(tableName, (table) => {
      table.dropColumn('created_by_id')
      table.dropColumn('created_by_name')
      table.dropColumn('created_by_ip')
      table.dropColumn('updated_by_id')
      table.dropColumn('updated_by_name')
      table.dropColumn('updated_by_ip')
      table.dropColumn('status')
    })

    // Restore original status as string
    await knex.schema.table(tableName, (table) => {
      table.string('status', 50).defaultTo(defaultStatus)
    })
  }

  const allTables = [
    'users',
    'blog',
    'faculty',
    'gallery',
    'announcements',
    'admission_dates',
    'admission_documents',
    'curriculum',
    'class_structure',
    'additional_programs',
    'cbse_general_info',
    'cbse_staff_details',
    'cbse_fee_structure',
    'cbse_documents',
    'cbse_infrastructure',
    'admission_applications',
    'contact_submissions'
  ]

  for (const table of allTables) {
    const defaultStatus =
      table === 'admission_applications'
        ? 'pending'
        : table === 'contact_submissions'
        ? 'unread'
        : 'active'

    await removeAuditFields(table, true, defaultStatus)
  }
}
