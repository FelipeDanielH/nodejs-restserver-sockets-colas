const TicketControl = require('../models/ticket-control');


// se crea el objeto de ticket control para utilizar sus metodos. Tambien, con tan solo crear el objeto, se ejecuta el constructor que ejecuta el metodo init() 
const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    console.log('Cliente conectado', socket.id );

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    socket.on('enviar-mensaje', ( payload, callback ) => {
        
        const id = 123456789;
        callback( id );

        socket.broadcast.emit('enviar-mensaje', payload );
    })

}

module.exports = {
    socketController
}