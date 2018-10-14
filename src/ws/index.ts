import * as io from 'socket.io-client';

let socket: any = null;
try {
    socket = io('http://192.168.1.29:8000');
} catch (e) {
    console.log('socket connect fail');
}

export default socket;
