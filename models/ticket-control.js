const path = require('path');
const fs = require('fs');

// no es muy comun pero este archivo tendra dos clases, lo normal es tener una pero esta clase sera muy sencilla por lo que ira en este mismo archivo 
class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero; // basicamente el numero de ticket
        this.escritorio = escritorio; // En este contexto, escritorio es una persona que esta trabajando en el ticket
    }
}

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
        const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json'); // con esta linea podemos convertir todo el archivo json a objeto literal de javascript donde podremos consultar tanto datos como propiedads tal cual un objeto normal 
        if (hoy === this.hoy) { // si la data del dia que esta en la base de datos coincide con la data que esta guardada en la variable de esta clase (correspondiente al dia de hoy) entonces se guardan todos los datos de la bd en las variables de esta clase
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        } else {
            // si no coinciden los datos significa que es otro dia y hay que reinicializar las variables
            this.guardarDB();
        }
    }

    guardarDB() {
        const dbPath = path.join(__dirname, '../db/data.json') // __dirname apunta al directorio de este archivo, que se encuentra dentro de la carpeta 'modelos', por lo que hay que ir una atras y por eso el ../db

        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }

    siguiente() {
        this.ultimo += 1; // se le suma uno a la variable ultimo
        const ticket = new Ticket(this.ultimo, null); // se crea una nueva clase de tipo ticket, se le asigna el numero siguiente y null que significa que nadie esta viendo este ticket
        this.tickets.push(ticket);

        //finalmente se graba en la base de datos 
        this.guardarDB();
        return "Ticket" + ticket.numero;
    }

    atenderTicket( escritorio ) { // recibe un escritorio que es la persona quien atendio el ticket 

        // si no hay tickets simplemente retorna null   
        if (this.tickets.length === 0) {
            return null;
        }

        // toma el primer ticket para quitarlo de la lista
        const ticket = this.tickets.shift() // shift es para remover el primer elemento de un arreglo tickets[0] y lo retorna

        ticket.escritorio = escritorio; // asigna el escritorio del elemento que acabamos de eliminar de los tickets

        this.ultimos4.unshift( ticket ); // unshift añade al principio de un arreglo el elemento pasado por parametro

        // si hay mas de 4 tickets entonces se eliminara el ultimo
        if( this.ultimos4.lenght > 4 ){
            this.ultimos4.splice(-1,1); // splice corta desde una posicion la cantidad indicada de elemento. En este caso se le pide que empiece desde el final (-1) y que corte solo uno (segundo argumento, 1)
        }

        console.log(this.ultimos4);

        this.guardarDB();

        return ticket;

    }
}

// para utilizar esta clase es necesario importarla como modulo (Las clases es mejor importarlas tal cual, no como objeto como normalmente se hace)

module.exports = TicketControl