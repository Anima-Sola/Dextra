export type MessageType = {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string | number;
  };
};

export type ChatType = {
  title: string;
  messages: Array<MessageType>;
};
