// La siguiente linea solo funciona en chrome y en firefox
const searchParams = new URLSearchParams( window.location.search );

// Referencias HTML
const lblEscritorio = document.querySelector('h1');
btnAtender = document.querySelector('button');


const socket = io();

if ( !searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('ultimo-ticket',(ultimoTicket) => {
    // lblNuevoTicket.innerText = 'Ticket: ' + ultimoTicket;
})

btnAtender.addEventListener( 'click', () => {

    // La definicion del listener 'siguiente ticket' esta en '../sockets/controller.js'
    // socket.emit( 'siguiente-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerText = ticket;
    // });

});