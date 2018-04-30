// Importar módulos necesarios.

const argv = require('./config/yargs.js').argv; // en argv almacenaré lo que esté configurado en .argv.
const colors = require('colors'); // habilitar cambios de color en consola.

//Usamos destructuración para llamar las funciones requeridas.
const porHacer = require('./por-hacer/por-hacer'); // no es necesario poner extensión .js del archivo.

let comando = argv._[0]; //Quiero la posición 0 porque ahí está el comando de interés.

switch (comando) {

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break
    case 'listar':
        //En listado, almacenamos la lista de tareas retornada por la función.
        let listado = porHacer.getListado(argv.descripcion, argv.completado);
        for (let tarea of listado) {
            console.log('======== POR HACER ========'.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('==========================='.green);
        }
        break
    case 'actualizar':
        let actualizado = porHacer.getActualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break
    case 'borrar':
        let borrado = porHacer.getBorrar(argv.descripcion);
        console.log(borrado);
        break
    default:
        console.log(`El comando ${comando} no fue encontrado.`);
}