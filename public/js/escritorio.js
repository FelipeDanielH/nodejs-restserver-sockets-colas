// La siguiente linea solo funciona en chrome y en firefox
const searchParams = new URLSearchParams( window.location.search );

// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');


const socket = io();

if ( !searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlerta.style.display = "none";

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on( 'tickets-pendientes', (pendientes) => {
    if( pendientes === 0 ){
        lblPendientes.style.display = 'none';
    }else {
        lblPendientes.style.display = '';
        lblPendientes.innerText = pendientes;
    }
})

btnAtender.addEventListener( 'click', () => {

    socket.emit( 'atender-ticket', { escritorio }, ( payload ) => {
        if( !payload.ok ) {
            lblTicket.innerText = 'Nadie';
            return divAlerta.style.display = '';
        }

        socket.emit( 'tickets-pendientes', null, (payload) => {
            lblPendientes.innerText = payload.cantidad
        })

        lblTicket.innerText = 'Ticket ' + payload.ticket.numero;
    });
});