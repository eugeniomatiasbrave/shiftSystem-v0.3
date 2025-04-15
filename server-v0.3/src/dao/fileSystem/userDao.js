import fs from 'fs';
import __dirname from '../../utils/utils.js';

const PATH = `${__dirname}/dao/fileSystem/users.json`;

class UserDao {

    constructor() {
        this.init();
    }

    async init() {
        if (fs.existsSync(PATH)) {
            // Si ya existe el archivo no hace nada...
            console.log('Ya existe el archivo users.json');
        } else {
            try {
                await fs.promises.writeFile(PATH, JSON.stringify([]), 'utf-8');
            } catch (error) { // Si algo sale mal
                console.log('Error al crear el archivo', error);
                process.exit(1); // Corta el servidor y el proceso de crear el archivo si hay un error
            }
        }
    }

    get = async () => {
        try {
            const users = await fs.promises.readFile(PATH, 'utf-8');
            return JSON.parse(users);
        } catch (error) {
            console.error('Error al leer los usuarios:', error);
            throw new Error('Failed to get users');
        }
    }

    getOne = async (params) => {
        try {
            const users = await this.get();
            return users.find(user => user.email === params.email);
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            throw new Error('Failed to get user');
        }
    }

    create = async (user) => {
        try {
            const users = await this.get();
            users.push(user);
            await fs.promises.writeFile(PATH, JSON.stringify(users), 'utf-8');
            return user;
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            throw new Error('Failed to create user');
        }
    }

    update = async (email, user) => {
        try {
            const users = await this.get();
            const index = users.findIndex(u => u.email === email);
            if (index === -1) {
                throw new Error('User not found');
            }
            users[index] = user;
            await fs.promises.writeFile(PATH, JSON.stringify(users), 'utf-8');
            return user;
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            throw new Error('Failed to update user');
        }
    }

    delete = async (email) => {
        try {
            const users = await this.get();
            const index = users.findIndex(u => u.email === email);
            if (index === -1) {
                throw new Error('User not found');
            }
            users.splice(index, 1);
            await fs.promises.writeFile(PATH, JSON.stringify(users), 'utf-8');
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            throw new Error('Failed to delete user');
        }
    }
}

export default UserDao;