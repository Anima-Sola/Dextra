import { MessageReceivedType, MessageType } from "@/constants/types";
import { SOCKET_URL } from "@/constants/urls";
import { socketService } from "@/services/socket/SocketService";
import { useEffect, useState } from "react";

export function useChatSocket() {
  const [isConnected, setIsConnected] = useState(
    () => socketService.isConnected,
  );

  useEffect(() => {
    const handleMessage = (message: MessageType) => {
      console.log("Response:", message);
    };

    const handleMessageDelivered = (message: MessageReceivedType) => {
      console.log("Message delivered:", message);
    };

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socketService.onMessage(handleMessage);
    socketService.onMessageDelivered(handleMessageDelivered);
    socketService.onConnect(handleConnect);
    socketService.onDisconnect(handleDisconnect);
    socketService.connect(SOCKET_URL);

    return () => {
      socketService.offMessage(handleMessage);
      socketService.offMessageDelivered(handleMessageDelivered);
      socketService.offConnect(handleConnect);
      socketService.offDisconnect(handleDisconnect);
    };
  }, []);

  const sendMessage = (message: MessageType) =>
    socketService.sendMessage(message);

  return {
    isConnected,
    sendMessage,
  };
}
