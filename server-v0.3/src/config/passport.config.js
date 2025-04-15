import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { usersServices } from "../services/indexRepositories.js";
import config from "./config.env.js";
import AuthService from "../services/AuthService.js";

const { SECRET } = config.auth.jwt;

const initializePassportConfig = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      async (req, email, password, done) => {
        const { firstName, lastName, birthDate } = req.body;
        if (!firstName || !lastName) {
          return done(null, false, { message: "Incomplete values" });
        }
        const user = await usersServices.getUserBy({ email });
        if (user) {
          return done(null, false, { message: "User already exists" });
        }
        let parsedDate;
        if (birthDate) {
          parsedDate = new Date(birthDate).toISOString();
        }

        const authService = new AuthService();
        const hashedPassword = await authService.hashPassword(password);
        const newUser = {
          firstName,
          lastName,
          email,
          birthDate: parsedDate,
          password: hashedPassword,
        };
        const result = await usersServices.createUser(newUser);
        return done(null, result);
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        console.log(`Attempting to find user with email: ${email}`);
        const user = await usersServices.getUserBy({ email });

        console.log(`User found: ${user}`);
        if (!user) {
          console.log("User not found");
          return done(null, false, { message: "Incorrect credentials" });
        }
        const authService = new AuthService();
        const isValidPassword = await authService.validatePassword(
          password,
          user.password
        );
        if (!isValidPassword) {
          console.log("Invalid password");
          return done(null, false, { message: "Incorrect credentials" });
        }
        return done(null, user);
      }
    )
  );

  // Add the current strategy to the passport configuration file ,
  // which will extract the JWT from the cookie and verify it using
  // the secret key. If the token is valid, the user object will be returned.
  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: SECRET,
      },
      async (payload, done) => {
        console.log("Estrategia- Current", payload);
        return done(null, payload);
      }
    )
  );
  // estrategia para headers, esta estrategia se encarga de extraer el token del header de la peticion y
  // verificarlo con la clave secreta

  passport.use(
    "Auth-Header",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET,
      },
      async (payload, done) => {
        try {
          return done(null, payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // La forma en que se extrae el token es algo a coordinar en el equipo de desarrollo,
  // puede venir por headers, cookies, query params, etc.
};

function cookieExtractor(req) {
  if (req && req.cookies) {
    return req.cookies["token"];
  }
  return null;
}
export default initializePassportConfig;
