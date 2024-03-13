import { Socket } from 'socket.io';
export declare class GatewayService {
    socket: Socket;
    handleEvent(body: any, client: Socket): any;
    handleJoinRoom(client: Socket, room: string): void;
    handleSendMessage(client: Socket, { content, roomId }: {
        content: any;
        roomId: any;
    }): void;
}
