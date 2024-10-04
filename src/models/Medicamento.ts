export class Medicamento {
    constructor(
        public nombre: string,
        public cantidad: number,
        public fechaCaducidad: string,
        public descripcion: string
    ) {}

    mostrarDetalles() {
        return `Nombre: ${this.nombre}, Cantidad: ${this.cantidad}, Fecha de Caducidad: ${this.fechaCaducidad}, Descripción: ${this.descripcion}`;
    }
}
