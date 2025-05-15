/**
 * Created by anatoly on 28.03.2025
 */

const net = require('net');

const handleSortRequest = (data) => {
    const text = data.toString();
    const words = text.match(/\w+/g);
    if (!words) return '';
    const uniqueWords = [...new Set(words.map(word => word.toLowerCase()))];
    uniqueWords.sort();
    return uniqueWords.join('\n');
};

const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        const response = handleSortRequest(data);
        socket.write(response);
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Word Sorter Server is running on port 3000');
});