const TicketControl = require('../models/ticket-control');

// se crea el objeto de ticket control para utilizar sus metodos. Tambien, con tan solo crear el objeto, se ejecuta el constructor que ejecuta el metodo init() 
const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    console.log('Cliente conectado. Ticket ID:', socket.id );

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    socket.emit( 'ultimo-ticket', ticketControl.ultimo );
    socket.emit( 'estado-actual', ticketControl.ultimos4 );
    socket.emit( 'tickets-pendientes', ticketControl.tickets.length);

    // Listener para activar siguiente ticket. No se utilizara payload por lo que cuando se emitan eventos lo ideal seria dejar el espacio con un null
    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        callback( siguiente );
    })

    socket.on('atender-ticket', ( { escritorio }, callback ) => {

        if( !escritorio ){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        };

        const ticket = ticketControl.atenderTicket( escritorio );
        
        socket.broadcast.emit( 'estado-actual', ticketControl.ultimos4);
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        if( !ticket ){
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        };
    });
}

module.exports = {
    socketController
}