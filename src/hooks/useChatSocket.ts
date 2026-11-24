import {
  MessageDeliveredStatusType,
  MessageType,
  onMessageDeliveredStatusEventType,
  onMessageEventType,
} from "@/constants/types";
import { SOCKET_URL } from "@/constants/urls";
import { socketService } from "@/services/socket/SocketService";
import { useEffect, useState } from "react";

export function useChatSocket(
  onMessage: onMessageEventType,
  onMessageDeliveredStatus: onMessageDeliveredStatusEventType,
) {
  const [isConnected, setIsConnected] = useState(
    () => socketService.isConnected,
  );

  useEffect(() => {
    const handleMessage = (message: MessageType) => onMessage(message);

    const handleMessageDeliveredStatus = (
      message: MessageDeliveredStatusType,
    ) => onMessageDeliveredStatus(message);

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socketService.onMessage(handleMessage);
    socketService.onMessageDelivered(handleMessageDeliveredStatus);
    socketService.onConnect(handleConnect);
    socketService.onDisconnect(handleDisconnect);
    socketService.connect(SOCKET_URL);

    return () => {
      socketService.offMessage(handleMessage);
      socketService.offMessageDelivered(handleMessageDeliveredStatus);
      socketService.offConnect(handleConnect);
      socketService.offDisconnect(handleDisconnect);
    };
  }, [onMessage, onMessageDeliveredStatus]);

  const sendMessage = (message: MessageType) =>
    socketService.sendMessage(message);

  return {
    isConnected,
    sendMessage,
  };
}
