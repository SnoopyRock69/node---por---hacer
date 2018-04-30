const fs = require('fs');
const colors = require('colors'); // importamos el módulo para manipular colores en la consola.

// Arreglo para poder mostrar listados, trabajar con notas independientes, etc.

let listadoPorHacer = [];


// Definimos las funciones necesarias para el funcionamiento de nuestra app.

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer); // Almacenamos la data en un formato json para poder almacenarlo en el array.
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo cargar.', err)
    });
}

const cargarDB = () => {
    //Manejo de excepciones por si el archivo .json está vacío.
    try {
        //Si no hay error carga la base de datos correctamente.
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        //Si hay algún error, inicialice el arreglo como vacío para ser
        //reconocido como un .json válido.
        listadoPorHacer = [];
    }
}

// Función para crear tarea
const crear = (descripcion) => {
    //Primero cargamos la BD para validar la información.
    cargarDB();
    //Definimos el objeto que contiene la información
    let porHacer = {
        descripcion,
        completado: false //false porque no tendría sentido crear tareas si ya están completas.
    };
    //Enviámos la información al arreglo.
    listadoPorHacer.push(porHacer);

    //Almacenamos la información en la BD.
    guardarDB(); // se ejecuta aquí porque en este punto ya debe haberse almacenado un registro.

    return porHacer;
}

//Función para mostrar el listado.
const getListado = (descripcion, completado) => {
    cargarDB();
    if (completado === 'true') {
        let estadoT = listadoPorHacer.filter(tarea => {
            return tarea.completado === completado;
        });
        return estadoT;
    }
    if (completado === 'false') {
        let estadoF = listadoPorHacer.filter(tarea => {
            return tarea.completado === eval(completado);
        });
        return estadoF;
    }
}

//Función para actualizar el listado.
const getActualizar = (descripcion, completado) => {
    //Primero hay que cargar la base de datos para poder manipular su información.
    cargarDB();
    //Obtengo el índice del arreglo que contiene la descripción.   
    let index = listadoPorHacer.findIndex(tarea => { //en tarea almaceno lo que se encuentra en el arreglo.
        return tarea.descripcion === descripcion; //si la descripción en el arreglo coincide con la ingresada.
    });
    //console.log(index);
    //Si no se encuentra nada en el arreglo index = -1.
    if (index >= 0) {
        console.log(' . . . Estado Actualizado . . .');
        //Actualiza la iformación.      
        listadoPorHacer[index].completado = completado;
        //Una vez actualizado, guardamos en la DB.
        guardarDB();
        return true; //Para saber si la tarea se realizó correctamente.
    } else {
        return false; //Para saber si hubo un error.
    }
}

//Función para eliminar descripción del listado.
const getBorrar = (descripcion) => {
    //cargamos la DB
    cargarDB();
    //Obtengo el índice del arreglo que contiene la descripción
    let nuevoListado = listadoPorHacer.filter(tarea => { //Filter me permite eliminar un elemento del arreglo.
        return tarea.descripcion !== descripcion; //retorna los elementos diferentes al que quiero borrar.
    })
    if (listadoPorHacer.length === nuevoListado.length) { // si tienen el mismo tamaño 
        return false; // no se borró nada.
    } else {
        listadoPorHacer = nuevoListado; // Actualice el listado.
        //Guardamos cambios en DB.
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    getActualizar,
    getBorrar
}