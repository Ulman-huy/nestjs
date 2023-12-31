import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MyGatesway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log({ body });
  }
}
