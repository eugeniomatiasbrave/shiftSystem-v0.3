import { initMySql } from './mySql/connection.js';
import UserDaoFileSystem from './fileSystem/userDao.js';
import ShiftDaoFileSystem from './fileSystem/shiftDao.js';
import UserDaoMySql from './mySql/userDao.js';
import ShiftDaoMySql from './mySql/shiftDao.js';
import { PaymentDao } from './mySql/paymentDao.js';

export default class PersistenceFactory {
    async selectPersistence(persistence) {
        switch (persistence) {
            case "FILESYSTEM": {
                return {
                    userDao: new UserDaoFileSystem(),
                    shiftDao: new ShiftDaoFileSystem(),
                    // No hay implementación de PaymentDao para FileSystem
                    paymentDao: null
                };
            }
            case 'MYSQL': 
                default: {
                await initMySql();
                return {
                  userDao: new UserDaoMySql(),
                  shiftDao: new ShiftDaoMySql(),
                  paymentDao: new PaymentDao()
                };
            }
        }
    }
}