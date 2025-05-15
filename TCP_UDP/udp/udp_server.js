/**
 * Created by anatoly on 28.03.2025
 */

// udp_server.js
const dgram = require('dgram');

const employees = {
    "john": "manager",
    "jane": "steno",
    "jim": "clerk",
    "jack": "salesman"
};

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
    const name = msg.toString().trim();
    const job = employees[name] || "No such employee";
    const response = Buffer.from(job);
    server.send(response, rinfo.port, rinfo.address, (err) => {
        if (err) console.log(`Error: ${err.message}`);
    });
});

server.on('listening', () => {
    console.log(`UDP Server started, servicing on port ${server.address().port}`);
});

server.on('error', (err) => {
    console.log(`Error: ${err.message}`);
});

server.bind(13000, '127.0.0.1');