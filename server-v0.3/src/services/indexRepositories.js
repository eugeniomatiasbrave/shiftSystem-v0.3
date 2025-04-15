import UsersRepository from "./repositories/UsersRepository.js";
import ShiftsRepository from "./repositories/ShiftsRepository.js"; // Importa ProductsRepository

import PersistenceFactory from "../dao/factory.js";
import config from "../config/config.env.js";

const factory = new PersistenceFactory();
const loadedEntities = await factory.selectPersistence(config.app.PERSISTENCE);

export const usersServices = new UsersRepository(loadedEntities.userDao);
export const shiftsServices = new ShiftsRepository(loadedEntities.shiftDao);