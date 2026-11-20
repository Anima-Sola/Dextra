export type MessageType = {
  id: string;
  type: "income" | "outgoing";
  content: string;
  createdAt: Date;
  userId: string;
};

export type ChatType = {
  id: string;
  title: string;
  messages: MessageType[];
};

export type MessageDeliveredType = {
  id: string;
  status: "delivered";
  deliveredAt: Date;
};

export type onMessageEventType = (message: MessageType) => void;
export type onMessageDeliveredStatusEventType = (
  message: MessageDeliveredType,
) => void;
export type onMessageErrorEventType = (error: { message: string }) => void;
export type onConnectEventType = () => void;
export type onDisconnectEventType = () => void;
