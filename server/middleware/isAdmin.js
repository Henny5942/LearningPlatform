const isAdmin = (req, res, next) => {
    const adminId = "6a03663b18e73cfca9b191ac"; // //id של המנהל
    if (req.user && req.user.userId === adminId) {
        next();
    } else {
        res.status(403).send("גישה למנהלים בלבד");
    }
};