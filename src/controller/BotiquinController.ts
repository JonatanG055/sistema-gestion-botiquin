import { Medicamento } from '../models/Medicamento';
import * as readline from 'readline';

export class BotiquinController {
    private medicamentos: Medicamento[] = [];
    private interface: readline.Interface;

    constructor() {
        this.interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    agregarMedicamento() {
        this.interface.question('Nombre del medicamento: ', (nombre) => {
            this.interface.question('Cantidad disponible: ', (cantidad) => {
                this.interface.question('Fecha de caducidad (YYYY-MM-DD): ', (fechaCaducidad) => {
                    this.interface.question('Descripción: ', (descripcion) => {
                        const nuevoMedicamento = new Medicamento(nombre, parseInt(cantidad), fechaCaducidad, descripcion);
                        this.medicamentos.push(nuevoMedicamento);
                        console.log('Medicamento agregado exitosamente.');
                        this.menu();
                    });
                });
            });
        });
    }

    mostrarMedicamentos() {
        if (this.medicamentos.length === 0) {
            console.log('No hay medicamentos en el botiquín.');
        } else {
            console.log('Lista de medicamentos:');
            this.medicamentos.forEach(medicamento => {
                console.log(medicamento.mostrarDetalles());
            });
        }
        this.menu();
    }

    buscarMedicamento() {
        this.interface.question('Nombre del medicamento a buscar: ', (nombre) => {
            const medicamento = this.medicamentos.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
            if (medicamento) {
                console.log(medicamento.mostrarDetalles());
            } else {
                console.log('Medicamento no encontrado.');
            }
            this.menu();
        });
    }

    actualizarMedicamento() {
        this.interface.question('Nombre del medicamento a actualizar: ', (nombre) => {
            const medicamento = this.medicamentos.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
            if (medicamento) {
                this.interface.question('Nueva cantidad: ', (cantidad) => {
                    this.interface.question('Nueva fecha de caducidad (YYYY-MM-DD): ', (fechaCaducidad) => {
                        this.interface.question('Nueva descripción: ', (descripcion) => {
                            medicamento.cantidad = parseInt(cantidad);
                            medicamento.fechaCaducidad = fechaCaducidad;
                            medicamento.descripcion = descripcion;
                            console.log('Medicamento actualizado exitosamente.');
                            this.menu();
                        });
                    });
                });
            } else {
                console.log('Medicamento no encontrado.');
                this.menu();
            }
        });
    }

    eliminarMedicamento() {
        this.interface.question('Nombre del medicamento a eliminar: ', (nombre) => {
            const index = this.medicamentos.findIndex(m => m.nombre.toLowerCase() === nombre.toLowerCase());
            if (index !== -1) {
                this.medicamentos.splice(index, 1);
                console.log('Medicamento eliminado exitosamente.');
            } else {
                console.log('Medicamento no encontrado.');
            }
            this.menu();
        });
    }

    requisitarMedicamento() {
        this.interface.question('Nombre del medicamento a requisitar: ', (nombre) => {
            const medicamento = this.medicamentos.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
            if (medicamento) {
                this.interface.question('Cantidad a requisitar: ', (cantidad) => {
                    const cantidadNumerica = parseInt(cantidad);
                    if (cantidadNumerica > medicamento.cantidad) {
                        console.log('No hay suficiente stock disponible.');
                    } else {
                        medicamento.cantidad -= cantidadNumerica;
                        console.log(`Se han requisitado ${cantidadNumerica} de ${medicamento.nombre}. Nueva cantidad: ${medicamento.cantidad}`);
                        if (medicamento.cantidad === 0) {
                            console.log(`El medicamento ${medicamento.nombre} se ha agotado.`);
                        }
                    }
                    this.menu();
                });
            } else {
                console.log('Medicamento no encontrado.');
                this.menu();
            }
        });
    }

    menu() {
        console.log('============================');
        console.log('BOTIQUIN DEL HOSPITAL');
        console.log('============================');
        console.log('1. Agregar el medicamento');
        console.log('2. Mostrar el medicamento');
        console.log('3. Buscar el medicamento');
        console.log('4. Actualizar medicamento');
        console.log('5. Eliminar medicamento');
        console.log('6. Crear la requisicion');
        console.log('7. Salir');
        console.log('============================');
        
        this.interface.question('Seleccione una opción: ', (opcion) => {
            switch (opcion) {
                case '1':
                    this.agregarMedicamento();
                    break;
                case '2':
                    this.mostrarMedicamentos();
                    break;
                case '3':
                    this.buscarMedicamento();
                    break;
                case '4':
                    this.actualizarMedicamento();
                    break;
                case '5':
                    this.eliminarMedicamento();
                    break;
                case '6':
                    this.requisitarMedicamento();
                    break;
                case '7':
                    console.log('Saliendo...');
                    this.interface.close();
                    break;
                default:
                    console.log('Opción no válida. Intente nuevamente.');
                    this.menu();
                    break;
            }
        });
    }
}
