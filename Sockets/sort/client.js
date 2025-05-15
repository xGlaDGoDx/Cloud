/**
 * Created by anatoly on 28.03.2025
 */

const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = net.createConnection({ port: 3000 }, () => {
    console.log('Connected to Word Sorter Server');
});

client.on('data', (data) => {
    console.log('Sorted words received:');
    console.log(data.toString());
});

client.on('end', () => {
    console.log('Disconnected from server');
    rl.close();
});

rl.on('line', (input) => {
    if (!input.trim()) {
        client.end();
    } else {
        client.write(input);
    }
});