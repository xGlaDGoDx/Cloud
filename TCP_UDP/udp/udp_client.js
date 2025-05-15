/**
 * Created by anatoly on 28.03.2025
 */

const dgram = require('dgram');
const readline = require('readline');

const client = dgram.createSocket('udp4');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.on('message', (msg) => {
    console.log(msg.toString().trim());
    askName();
});

client.on('error', (err) => {
    console.log(`Error: ${err.message}`);
    rl.close();
});

function askName() {
    rl.question('Name: ', (name) => {
        if (!name) {
            client.close();
            rl.close();
            return;
        }
        const message = Buffer.from(name);
        client.send(message, 13000, '127.0.0.1', (err) => {
            if (err) console.log(`Error: ${err.message}`);
        });
    });
}

askName();