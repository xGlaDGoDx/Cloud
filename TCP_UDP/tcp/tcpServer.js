/**
 * Created by anatoly on 28.03.2025
 */

const net = require('net');

const employees = {
    "john": "manager",
    "jane": "steno",
    "jim": "clerk",
    "jack": "salesman"
};

const server = net.createServer((socket) => {
    console.log(`Connected: ${socket.remoteAddress}:${socket.remotePort}`);
    socket.write(`${Object.keys(employees).length} Employees available\n`);

    socket.on('data', (data) => {
        const name = data.toString().trim();
        if (!name) {
            socket.end();
            return;
        }
        const job = employees[name] || "No such employee";
        socket.write(`${job}\n`);
    });

    socket.on('end', () => {
        console.log(`Disconnected: ${socket.remoteAddress}:${socket.remotePort}`);
    });

    socket.on('error', (err) => {
        console.log(`Error: ${err.message}`);
    });
});

server.listen(13000, '127.0.0.1', () => {
    console.log('TCP Server started, listening on port 13000');
});