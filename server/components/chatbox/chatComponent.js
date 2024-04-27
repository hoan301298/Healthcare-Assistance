const MessageDetail = require('../model/ChatText');

const chatComponent = (io) => {

    io.on('connection', (socket) => {
        console.log(`⚡: ${socket.id} user just connected!`);

        socket.on('message', async (data) => {
            io.emit('messageResponse', data);
            const messgae = new MessageDetail({
                sender: data.name,
                content: data.text
            })
            await messgae.save();
        });

        socket.on('typing', (data) => {
            socket.broadcast.emit('typingResponse', data);
        });

        socket.on('disconnect', () => {
            console.log('🔥: A user disconnected');
        });
    });
    
}

module.exports = chatComponent;