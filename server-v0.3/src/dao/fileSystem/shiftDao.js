import fs from 'fs';
import __dirname from '../../utils/utils.js';

const PATH = `${__dirname}/dao/fileSystem/shifts.json`;

class ShiftDao {
      constructor() {
        this.init();
   }

   async init() {

    if (fs.existsSync(PATH)) {
            //si ya existe el archivo no hace nada...
            console.log('Ya existe el archivo shifts.json');
        } else {
            try {
              await fs.promises.writeFile(PATH, JSON.stringify([]), 'utf-8')	
            } catch (error) { // si algo sale mal
                console.log('Error al crear el archivo', error);
                process.exit(1); // aca corta el servidor y el proceso de crear el archivo si hay un error
            }
        }
       }; // fin del init

    async get() {
        try {
            const data = await fs.promises.readFile(PATH, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer los shifts:', error);
            throw new Error('Failed to get shifts');
        }
    }

    async getById(id) {
        try {
            const shifts = await this.get();
            return shifts.find(shift => shift.id === id);
        } catch (error) {
            console.error('Error al obtener el shift por ID:', error);
            throw new Error('Failed to get shift by ID');
        }
    }

    async create(shift) {
        try {
            const shifts = await this.get();
            shifts.push(shift);
            await fs.promises.writeFile(PATH, JSON.stringify(shifts, null, 2));
            return shift;
        } catch (error) {
            console.error('Error al crear el shift:', error);
            throw new Error('Failed to create shift');
        }
    }

    async update(id, updatedShift) {
        try {
            const shifts = await this.get();
            const index = shifts.findIndex(shift => shift.id === id);
            if (index === -1) {
                throw new Error('shift not found');
            }
            shifts[index] = { ...shifts[index], ...updatedShift };
            await fs.promises.writeFile(PATH, JSON.stringify(shifts, null, 2));
            return shifts[index];
        } catch (error) {
            console.error('Error al actualizar el shift:', error);
            throw new Error('Failed to update shift');
        }
    }

    async delete(id) {
        try {
            const shifts = await this.get();
            const filteredShifts = shifts.filter(shift => shift.id !== id);
            await fs.promises.writeFile(PATH, JSON.stringify(filteredShifts, null, 2));
            return { id };
        } catch (error) {
            console.error('Error al eliminar el shift:', error);
            throw new Error('Failed to delete shift');
        }
    }
}

export default ShiftDao;