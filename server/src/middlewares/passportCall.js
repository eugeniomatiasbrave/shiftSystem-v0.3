import passport from "passport";
import logger from "../config/log4js.config.js";

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    // Loggear las cookies y encabezados para diagnóstico
    logger.info(`Auth header: ${req.headers.authorization}`);
    logger.info(`Cookies: ${req.cookies ? JSON.stringify(req.cookies) : 'No cookies'}`);
    
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