"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medicamento = void 0;
class Medicamento {
    constructor(nombre, cantidad, fechaCaducidad, descripcion) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.fechaCaducidad = fechaCaducidad;
        this.descripcion = descripcion;
    }
    mostrarDetalles() {
        return `Nombre: ${this.nombre}, Cantidad: ${this.cantidad}, Fecha de Caducidad: ${this.fechaCaducidad}, Descripción: ${this.descripcion}`;
    }
}
exports.Medicamento = Medicamento;
