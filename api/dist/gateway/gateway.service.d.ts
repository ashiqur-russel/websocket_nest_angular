import { Socket } from 'socket.io';
export declare class GatewayService {
    socket: Socket;
    handleEvent(body: any, client: Socket): any;
}
