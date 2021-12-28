const authorization = (Number) => {
  return (req, res, next) => {
    if (!req.token || !req.token.role || !req.token.role == Number) {
      return res.status(403).json({
        success: false,
        message: `Unauthorizd`,
      });
    }

    next();
  };
};

module.exports = { authorization };
