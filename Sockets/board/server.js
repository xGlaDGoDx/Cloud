const fs = require('fs');
const net = require('net');
const filePath = './messages.txt';

const handleNoticeRequest = (data) => {
    const text = data.toString().trim();

    if (text === 'LIST') {
        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf8');
        }
        return 'No messages available.';
    }

    if (text) {
        fs.appendFileSync(filePath, text + ';');
        return `Message added: "${text}"`;
    }

    return '';
};

const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        const response = handleNoticeRequest(data);
        socket.write(response);
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(4000, () => {
    console.log('Notice Board Server is running on port 4000');
});