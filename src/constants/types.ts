export type MessageType = {
  chatId: string;
  messageId: string;
  type: "income" | "outgoing";
  content: string;
  createdAt: Date;
  userId: string;
  status: "delivered" | "notDelivered" | "sending";
};

export type ChatType = {
  id: string;
  title: string;
  messages: MessageType[];
};

export type MessageDeliveredStatusType = {
  chatId: string;
  messageId: string;
  status: "delivered" | "notDelivered" | "sending";
  deliveredAt?: Date | null;
};

export type onMessageEventType = (message: MessageType) => void;
export type onMessageDeliveredStatusEventType = (
  message: MessageDeliveredStatusType,
) => void;
export type onMessageErrorEventType = (
  error: MessageDeliveredStatusType,
) => void;
export type onConnectEventType = () => void;
export type onDisconnectEventType = () => void;
