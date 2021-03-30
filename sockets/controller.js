const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl;

const socketController = socket => {

    // console.log('Cliente conectado', socket.id);

    // socket.on('disconnect', () => {
    //     console.log('Cliente desconectado');
    // })

    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimosCuatro);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    socket.on('siguiente-ticket', (payload, callback) => {
        
        // const id = 123456;
        // callback(id);
        // socket.broadcast.emit('enviar-mensaje', payload)

        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

    })

    socket.on('atender-ticket', ({escritorio}, callback) => {
        
        if(!escritorio){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        //Notificar cambio en los ultimos 4
        socket.broadcast.emit('estado-actual', ticketControl.ultimosCuatro);
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        if(!ticket){
            callback({
                ok: false,
                msg: 'Ya no hay ticket pendientes'
            })
        }else{
            callback({
                ok: true,
                ticket
            })
        }
    })
}

module.exports = socketController;