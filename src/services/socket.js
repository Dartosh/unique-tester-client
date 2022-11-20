import socketIOClient from 'socket.io-client';

import endpoints from '../constants/endpoints';

export const init = () => {
    const socket = socketIOClient(endpoints.mainUrl, {
        transports: ['websocket'],
    });

    socket.on('connect', () => {});

    return socket;
};

export const listenNewLogs = (
    socket,
    setNewLogs = () => {},
) => {
    try {
        socket.on('logs', (data) => {
            setNewLogs((old) => [...old, data]);
        });
    } catch {}
};
