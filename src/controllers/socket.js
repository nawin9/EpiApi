const ioHandler = io => {
    io.on('connection', socket => {
        console.log('A user connected (id = ', socket.id, ' )');
        socket.on('new user', data => {
            socket.emit('new user', data);
        });

        socket.on('quit', () => {
            socket.emit('quit', { message: 'user quit' });
        });
    });
};

export default { ioHandler };
