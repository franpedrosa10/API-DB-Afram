import jwt from  "jsonwebtoken";

const SECRET_KEY = process.env.CLAVE;

// Middleware para verificar el token y comparar el ID del usuario
const verifyUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const userId = req.headers['user-id'] 
    
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY); 
      if (decoded.id.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'ID de usuario no coincide con el token' });
      }
  
      req.user = decoded; 
      next(); 
    } catch (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
  };

export default verifyUser; 