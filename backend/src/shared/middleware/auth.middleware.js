import jwt from "jsonwebtoken";

export function authenticateAdmin(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (
      !authorizationHeader ||
      !authorizationHeader.startsWith("Bearer ")
    ) {
      const error = new Error("Authentication token is required");
      error.statusCode = 401;
      throw error;
    }

    const token = authorizationHeader.split(" ")[1];

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.admin = {
      id: payload.adminId,
      role: payload.role,
    };

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      error.message = "Invalid or expired authentication token";
      error.statusCode = 401;
    }

    next(error);
  }
}