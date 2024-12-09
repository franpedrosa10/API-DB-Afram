import jwt from  "jsonwebtoken";

const SECRET_KEY = process.env.CLAVE;

const verifyRol = (requiredType) => {
    return (req, res, next) => {
      const token = req.headers['authorization']?.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
      }
  
      try {
        const decoded = jwt.verify(token, SECRET_KEY); 
        if (decoded.user_type !== requiredType) {
          return res.status(403).json({ message: "Acceso denegado: permisos insuficientes" });
        }
  
        req.user = decoded; 
        next(); 
      } catch (err) {
        return res.status(403).json({ message: "Token inválido o expirado" });
      }
    };
  };
  
  export default verifyRol ;