import ShiftsRepository from "./repositories/ShiftsRepository.js";
import UsersRepository from "./repositories/UsersRepository.js";
import PaymentsRepository from "./repositories/PaymentsRepository.js";

import PersistenceFactory from "../dao/factory.js";
import config from "../config/config.env.js";

const factory = new PersistenceFactory();
const loadedEntities = await factory.selectPersistence(config.app.PERSISTENCE);

const shiftsServices = new ShiftsRepository(loadedEntities.shiftDao);
const usersServices = new UsersRepository(loadedEntities.userDao);
const paymentServices = new PaymentsRepository(loadedEntities.paymentDao);

export { shiftsServices, usersServices, paymentServices };