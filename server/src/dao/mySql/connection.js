import { Sequelize } from 'sequelize';
import config  from '../../config/config.env.js';
import mysql from 'mysql2/promise';

const { PORT, HOST, USER, PASSWORD, DATABASE } = config.mysql;


const createDatabase = async () => {
    const connection = await mysql.createConnection({ host: HOST, user: USER, password: PASSWORD });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DATABASE}\`;`);
};

const db = new Sequelize( DATABASE, USER, PASSWORD, {
	host: HOST,
	dialect: 'mysql',
	port: PORT,
  });

  export const initMySql = async () => {
    try {
      await createDatabase(); // Asegúrate de que la base de datos exista
      await db.authenticate(); // Verifica la conexión
      console.log("Conexión a la base de datos MySQL exitosa.");
    } catch (error) {
      console.error("Error al conectar con la base de datos:", error);
    }
};

export default db;