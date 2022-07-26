// import { io } from "socket.io-client";

const randomKey = Math.random().toString(16).slice(2,-1) 
// export const socket = io(`ws://192.168.43.77:9001/ws/${randomKey}`, {
//   reconnectionDelayMax: 5000
// });


export const ws = new WebSocket(`ws://192.168.43.77:9001/ws/${randomKey}`);

console.log('ws连接状态：' + ws.readyState);