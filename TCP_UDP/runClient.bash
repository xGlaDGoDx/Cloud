#!/bin/bash

# Выбор клиента в зависимости от аргумента
case "$1" in
    "-tcp")
        echo "Запускаю TCP-клиент..."
        node ./tcp/tcpClient.js
        ;;
    "-udp")
        echo "Запускаю UDP-клиент..."
        node ./udp/udpClient.js
        ;;
    *)
        echo "Неверный аргумент: $1"
        echo "Используйте -tcp или -udp"
        exit 1
        ;;
esac

exit 0

