// Definimos objetos.

const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer.'
}

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea.',
}

//importamos el módulo yargs para usar los comandos.

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer.', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea.', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra un elemento por hacer', {
        descripcion
    })
    .command('listar', 'Muestra la lista de tareas', {
        completado
    })
    .help()
    .argv;

// exportamos el objeto con la configuración de los comandos.
module.exports = {
    argv
}