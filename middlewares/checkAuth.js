module.exports = (req, res, next) => {
  const userId = req.headers["userid"];
  if (!userId) return res.status(401).json({ message: "Access Denied!" });
  try {
    req.userId = userId;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token!" });
  }
};
