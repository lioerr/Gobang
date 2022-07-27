// import { io } from "socket.io-client";

const randomKey = Math.random().toString(16).slice(2,-1) 
// export const socket = io(`ws://192.168.43.77:9001/ws/${randomKey}`, {
//   reconnectionDelayMax: 5000
// });
let message: any


export const ws = new WebSocket(`ws://192.168.10.44:9001/ws/123`);

ws.onmessage = e => {
    console.log(e,'eeeeeeeee');
    message = e.data
}

export const msg = (): string => {
    return message
}