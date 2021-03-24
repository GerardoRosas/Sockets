const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl;

const socketController = socket => {

    // console.log('Cliente conectado', socket.id);

    // socket.on('disconnect', () => {
    //     console.log('Cliente desconectado');
    // })

    socket.emit('ultimo-ticket', ticketControl.ultimo);

    socket.on('siguiente-ticket', (payload, callback) => {
        
        // const id = 123456;
        // callback(id);
        // socket.broadcast.emit('enviar-mensaje', payload)

        const siguiente = ticketControl.siguiente();
        callback(siguiente);

        //Notificar que hay un nuevo ticket pendiente de

    })
}

module.exports = socketController;