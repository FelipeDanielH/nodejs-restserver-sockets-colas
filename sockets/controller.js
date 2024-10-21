const TicketControl = require('../models/ticket-control');

// se crea el objeto de ticket control para utilizar sus metodos. Tambien, con tan solo crear el objeto, se ejecuta el constructor que ejecuta el metodo init() 
const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    console.log('Cliente conectado. Ticket ID:', socket.id );

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    socket.emit( 'ultimo-ticket', ticketControl.ultimo );

    // Listener para activar siguiente ticket. No se utilizara payload por lo que cuando se emitan eventos lo ideal seria dejar el espacio con un null
    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();

        callback( siguiente );

        // TODO Notificar que hay un nuevo ticket pendiente de asignar
    })

    
    socket.on('atender-ticket', ({escritorio}, callback ) => { // Desde el payload (sabiendo que desde el emit que esta en escritorio.js se mandara la variable escritorio) se desestructura directamente escritorio
        if ( !escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }
        
        const ticket = ticketControl.atenderTicket( escritorio );

        if( !ticket ) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        }

        callback( ticket );
    })
}

module.exports = {
    socketController
}