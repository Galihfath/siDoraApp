// middleware/authenticateAdmin.js
function authenticateAdmin(req, res, next) {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Akses ditolak, hanya Admin yang bisa melakukan ini' });
    }
    next();
  }
  
  module.exports = authenticateAdmin;
  