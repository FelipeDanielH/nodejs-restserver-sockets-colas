const path = require('path');
const fs = require('fs');

/* Esto va a ser una clase comun y corriente */
class TicketControl {
    // En el constructor vamos a poner todas las clases que vamos a ocupar
    constructor() {
        // propiedad para almacenar el ultimo ticket que se esta atendiendo
        this.ultimo = 0;

        // manejar la fecha de hoy
        this.hoy = new Date().getDate();

        // para manejar todos los tickets que estan pendientes
        this.tickets = [];

        // para manejar los ultimos 4 tickets (que seran mostrados en el frontend)
        this.ultimos4 = [];

        // se inicializa todo con la funcion que esta mas abajo init()
        this.init();
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    // metodo para inicializar la clase (servidor)
    init() {
        const {hoy, tickets, ultimo, ultimos4 } = require('../db/data.json'); // con esta linea podemos convertir todo el archivo json a objeto literal de javascript donde podremos consultar tanto datos como propiedads tal cual un objeto normal 
        if ( hoy === this.hoy ) { // si la data del dia que esta en la base de datos coincide con la data que esta guardada en la variable de esta clase (correspondiente al dia de hoy) entonces se guardan todos los datos de la bd en las variables de esta clase
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }else {
            // si no coinciden los datos significa que es otro dia y hay que reinicializar las variables
            this.guardarDB();
        }
    }

    guardarDB () {
        const dbPath = path.join( __dirname, '../db/data.json') // __dirname apunta al directorio de este archivo, que se encuentra dentro de la carpeta 'modelos', por lo que hay que ir una atras y por eso el ../db

        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) )
    }
}

// para utilizar esta clase es necesario importarla como modulo (Las clases es mejor importarlas tal cual, no como objeto como normalmente se hace)

module.exports = TicketControl