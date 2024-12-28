import jwt from "jsonwebtoken";
export const authMiddleware = (requiredRoles = []) => {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).send({ message: "토큰이 필요합니다" });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.status(401).send({ message: "유효하지 않은 토큰입니다" });
      req.user = decoded;
      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        return res.status(403).send({ message: "권한이 없습니다." });
      }
      next();
    });
  };
};
