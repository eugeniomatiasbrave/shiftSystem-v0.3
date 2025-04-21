import passport from "passport";

export const passportCall = (strategy) => {
  console.log("Estrategia", strategy);
  return async (req, res, next) => {
    passport.authenticate(strategy, function (error, user, info) {
      console.log("User-passportCall", user);
      if (error) return next(error);
      if (!user) {
        req.user = null;
      }
      req.user = user;
      console.log("req.user-passportCall", req.user);
      next();
    })(req, res, next);
  };
};