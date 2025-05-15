/**
 * Created by anatoly on 28.03.2025
 */

const net = require('net');

const handleSortRequest = (data) => {
    const text = data.toString().trim();  // Убираем лишние пробелы и символы новой строки
    const words = text.match(/\w+/g);
    if (!words) return 'No valid words found\n';
    const uniqueWords = [...new Set(words.map(word => word.toLowerCase()))];
    uniqueWords.sort();
    return uniqueWords.join('\n') + '\n';  // Завершаем ответ символом новой строки
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

    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Word Sorter Server is running on port 3000');
});
