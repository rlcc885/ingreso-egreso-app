export class User {
    public nombre: string;
    public email: string;
    public uid: string;

    constructor( nombre: string, email: string, uid: string) {
        this.nombre = nombre;
        this.email = email;
        this.uid = uid;
    }

    static fromFirebase( { email, uid, nombre }) {
      return new User(nombre, email, uid);
    }
}
