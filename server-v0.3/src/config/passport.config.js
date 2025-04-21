import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { usersServices } from "../services/indexRepositories.js";
import config from "./config.env.js";
import AuthService from "../services/AuthService.js";
import dotenv from 'dotenv';
dotenv.config();


const { JWT_SECRET } = process.env; // Asegúrate de que JWT_SECRET esté definido en tu archivo .env
const { ADMIN_EMAIL, ADMIN_PWD } = config.app;

const initializePassportConfig = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      async (req, email, password, done) => {
        const { firstName, lastName, phone } = req.body;

        // Validar campos obligatorios
        if (!firstName || !lastName || !email || !password) {
          return done(null, false, { message: "Incomplete values" });
        }

        // Verificar si el usuario ya existe
        const existingUser = await usersServices.getUserBy({ email });
        if (existingUser) {
          return done(null, false, { message: "User already exists" });
        }

        const authService = new AuthService();
        const hashedPassword = await authService.hashPassword(password);

        // Determinar el rol del usuario
        let role = "user";
        if (email === ADMIN_EMAIL && password === ADMIN_PWD) {
          role = "admin";
        }

        const newUser = {
          firstName,
          lastName,
          email,
          phone: phone || null, // Opcional
          day_creation: new Date().toISOString(), // Fecha actual
          password: hashedPassword,
          role,
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

 
  passport.use('current', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: JWT_SECRET
  }, async (payload, done) => {
    console.log("Payload recibido:", payload);
    if (!payload) {
      return done(null, false);
    }
    return done(null, payload);
  }));
// estrategia para headers, esta estrategia se encarga de extraer el token del header de la peticion y 
// verificarlo con la clave secreta

passport.use('Auth-Header', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        return done(null, payload);
    } catch (error) {
        return done(error);
    }
}));


  
};

function cookieExtractor(req) {
  if (req && req.cookies) {
      return req.cookies['token'];
  }
  return null;
}
  

/*
const extractAuthToken = (req) =>{
  let token = null;
  if(req.cookies){
      token = req.cookies['token']
  }
  return token;
}
*/

export default initializePassportConfig;
