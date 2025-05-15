/**
 * Created by anatoly on 28.03.2025
 */

// tcp_client.js
const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new net.Socket();
client.connect(13000, '127.0.0.1', () => {
    console.log('Connected to TCP server');
});

client.on('data', (data) => {
    console.log(data.toString().trim());
    rl.question('Name: ', (name) => {
        client.write(`${name}\n`);
        if (!name) client.end();
    });
});

client.on('end', () => {
    console.log('Disconnected from server');
    rl.close();
});

client.on('error', (err) => {
    console.log(`Error: ${err.message}`);
    rl.close();
});