// Middleware to add audit fields to request body
const addAuditFields = (req, res, next) => {
  // Get user info from authenticated request
  const userId = req.user?.id || null;
  const userName = req.user?.email || 'System';
  
  // Get IP address
  const ip = req.headers['x-forwarded-for'] || 
              req.headers['x-real-ip'] || 
              req.connection.remoteAddress || 
              req.socket.remoteAddress ||
              req.ip;

  // Clean IP (remove ::ffff: prefix if present)
  const cleanIp = ip ? ip.replace('::ffff:', '') : null;

  // Add audit fields to request for create operations
  if (req.method === 'POST') {
    req.auditData = {
      created_by_id: userId,
      created_by_name: userName,
      created_by_ip: cleanIp,
      status: 'active',
    };
  }

  // Add audit fields to request for update operations
  if (req.method === 'PUT' || req.method === 'PATCH') {
    req.auditData = {
      updated_by_id: userId,
      updated_by_name: userName,
      updated_by_ip: cleanIp,
    };
  }

  next();
};

// Helper function to merge audit data with request body
const mergeAuditData = (body, auditData) => {
  return {
    ...body,
    ...auditData,
  };
};

module.exports = {
  addAuditFields,
  mergeAuditData,
};
