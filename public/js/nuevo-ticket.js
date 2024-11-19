// Referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();

/*
    La idea general del listener de connect y diconnect es que si el cliente esta conectado muestre el boton de crear ticket y en caso de no estar conectado lo deshabilite
*/
socket.on('connect', () => {
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

socket.on('ultimo-ticket',(ultimoTicket) => {
    lblNuevoTicket.innerText = 'Ticket: ' + ultimoTicket;
});

btnCrear.addEventListener( 'click', () => {
    // La definicion del listener 'siguiente ticket' esta en '../sockets/controller.js'
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });
});