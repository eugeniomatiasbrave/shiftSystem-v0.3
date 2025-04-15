/*
import db from '../dao/mySql/connection.js'; // Importa la conexión de MySQL
import mongoose from 'mongoose'; // Importa mongoose para la conexión de MongoDB

// Manejo el evento de salida del proceso
process.on('exit', (code) => {
    console.log(`Process exited with code: ${code}`);
    db.close(); // Cierra la conexión de MySQL
    mongoose.connection.close(); // Cierra la conexión de MongoDB
});

// Manejo las excepciones no capturadas
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message); // Imprime el mensaje del error
    console.error(err.stack); // Imprime el stacktrace del error
    db.close(); // Cierra la conexión de MySQL
    mongoose.connection.close(); // Cierra la conexión de MongoDB
    process.exit(1); // Salir del proceso después de manejar el error
});

// Manejo mi propio cierre la conexión (Ctrl+C)
process.on('SIGINT', () => {
    console.log('Process interrupted');
    db.close(); // Cierra la conexión de MySQL
    mongoose.connection.close(); // Cierra la conexión de MongoDB
    process.exit(0); // Salir del proceso
});
*/