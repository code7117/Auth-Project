const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return { status: false, message: "Not Authorized. Please log in again." };
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.userId = tokenDecode.id; // ✅ safer than using req.body
      next();
    } else {
      return { status: false, message: "Not Authorized. Please log in again." };
    }
  } catch (err) {
    console.error(err);
    return { status: false, message: "Invalid or expired token" };
  }
};

module.exports = userAuth;
