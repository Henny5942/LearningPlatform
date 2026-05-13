const isAdmin = (req, res, next) => {
  // בדיקה האם קיים אובייקט משתמש והאם שדה ה-isAdmin הוא אמת
    if (req.user && req.user.isAdmin) {
        next();
    }else{
        return res.status(403).json({
    message: "Access denied. Admins only.",
  });
    }
  
};

module.exports = isAdmin;