import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export function connectWebSocket(onRouteUpdate) {
  stompClient = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("✅ WebSocket Connected");

     stompClient.subscribe("/topic/route", (message) => {
       const data = JSON.parse(message.body);
       onRouteUpdate(data);
     });

    },
  });

  stompClient.activate();
}
