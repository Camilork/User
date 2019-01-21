export class Personas {
    constructor(_id = null,nombre = "",apellido = "", correo = ""){
        this._id= _id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
    }
    _id: string;
    nombre: string;
    apellido: string;
    correo: string;
}
