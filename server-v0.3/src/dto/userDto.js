export default class UserDto {
    constructor(user) {
        this.id = user._id || user.id_user; // Cambiado a id_user para alinearse con el modelo
        this.firstName = user.firstName; 
        this.lastName = user.lastName;
        this.email = user.email;
        this.phone = user.phone; // Agregado
        this.day_creation = user.day_creation; // Agregado
        this.role = user.role;
    }

     // Método para token
     static forToken(user) {
        return {
            id: user._id || user.id_user,
            name: `${user.firstName} ${user.lastName}`, 
            email: user.email,
            role: user.role
        };
    }

    // Método para usuarios
    static forUser(user) {
        return {
            id: user._id || user.id_user, // Cambiado a id_user
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            phone: user.phone, // Agregado
            day_creation: user.day_creation, // Agregado
            role: user.role
        };
    }
}