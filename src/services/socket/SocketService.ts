import {
  MessageDeliveredStatusType,
  MessageType,
  onConnectEventType,
  onDisconnectEventType,
  onMessageDeliveredStatusEventType,
  onMessageErrorEventType,
  onMessageEventType,
} from "@/constants/types";
import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;
  private connectionUrl: string | null = null;
  private messageListeners = new Set<onMessageEventType>();
  private messageDeliveredListeners =
    new Set<onMessageDeliveredStatusEventType>();
  private errorListeners = new Set<onMessageErrorEventType>();
  private connectListeners = new Set<onConnectEventType>();
  private disconnectListeners = new Set<onDisconnectEventType>();

  connect(url: string): void {
    if (this.socket?.active && this.connectionUrl === url) {
      return;
    }

    this.disconnect();
    this.connectionUrl = url;
    const socket = io(url, { path: "/ws", autoConnect: false });
    this.socket = socket;

    socket.on("connect", () => {
      console.log("Socket.IO connected");
      this.connectListeners.forEach((callback) => callback());
    });

    socket.on("message", (message: MessageType) => {
      this.messageListeners.forEach((callback) => callback(message));
    });

    socket.on("message:delivered", (message: MessageDeliveredStatusType) => {
      this.messageDeliveredListeners.forEach((callback) => callback(message));
    });

    socket.on("chat:error", (error: MessageDeliveredStatusType) => {
      this.errorListeners.forEach((callback) => callback(error));
    });

    socket.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
    });

    socket.on("disconnect", (reason) => {
      if (this.socket !== socket) {
        return;
      }

      console.log("Socket.IO disconnected:", reason);
      this.disconnectListeners.forEach((callback) => callback());
    });

    socket.connect();
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  sendMessage(message: MessageType): void {
    if (!this.socket?.connected) {
      console.warn("Socket.IO is not connected");
      return;
    }

    this.socket.emit("message", message);
  }

  onMessage(callback: onMessageEventType): void {
    this.messageListeners.add(callback);
  }

  offMessage(callback: onMessageEventType): void {
    this.messageListeners.delete(callback);
  }

  onMessageDelivered(callback: onMessageDeliveredStatusEventType): void {
    this.messageDeliveredListeners.add(callback);
  }

  offMessageDelivered(callback: onMessageDeliveredStatusEventType): void {
    this.messageDeliveredListeners.delete(callback);
  }

  onError(callback: onMessageErrorEventType): void {
    this.errorListeners.add(callback);
  }

  offError(callback: onMessageErrorEventType): void {
    this.errorListeners.delete(callback);
  }

  onConnect(callback: onConnectEventType): void {
    this.connectListeners.add(callback);
    if (this.isConnected) {
      callback();
    }
  }

  offConnect(callback: onConnectEventType): void {
    this.connectListeners.delete(callback);
  }

  onDisconnect(callback: onDisconnectEventType): void {
    this.disconnectListeners.add(callback);
  }

  offDisconnect(callback: onDisconnectEventType): void {
    this.disconnectListeners.delete(callback);
  }

  get isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export const socketService = new SocketService();
