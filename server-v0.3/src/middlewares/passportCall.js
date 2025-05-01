import passport from "passport";
import logger from "../config/log4js.config.js";

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    // Extraer y formatear el token correctamente
    let token = null;
    const authHeader = req.headers.authorization;
    
    logger.info(`Auth header recibido: ${authHeader}`);
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remover 'Bearer ' del inicio
      logger.info(`Token extraído correctamente: ${token.substring(0, 20)}...`);
    } else {
      logger.warn(`No se recibió un token en formato correcto: ${authHeader}`);
    }
    
    passport.authenticate(strategy, function (error, user, info) {
      if (error) {
        logger.error(`Error de autenticación: ${error.message}`);
        return next(error);
      }
      
      if (!user) {
        logger.warn(`Usuario no autenticado: ${info?.message || 'No info'}`);
        req.user = null;
      } else {
        logger.info(`Usuario autenticado: ${user.email} (ID: ${user.id_user})`);
        req.user = user;
      }
      
      next();
    })(req, res, next);
  };
};