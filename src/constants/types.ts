export type MessageType = {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    name?: string;
    avatar?: string;
  };
};

export type MessageDeliveredType = {
  _id: string;
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

export type ChatType = {
  title: string;
  messages: Array<MessageType>;
};
