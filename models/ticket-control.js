
/* Esto va a sr una clase comun y corriente */
class TicketControl {
    // En el constructor vamos a poner todas las clases que vamos a ocupar
    contructor() {
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
        const data = require('../db/data.json'); // con esta linea podemos convertir todo el archivo json a objeto literal de javascript donde podremos consultar tanto datos como propiedads tal cual un objeto normal 
        console.log(data);
        console.log("uwu");
    }

    guardarDB () {

    }
}

// para utilizar esta clase es necesario importarla como modulo (Las clases es mejor importarlas tal cual, no como objeto como normalmente se hace)

module.exports = TicketControl