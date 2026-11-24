import EmptyChat from "@/components/Chat/EmptyChat";
import ChatHeader from "@/components/Chat/Header";
import IncomeMessage from "@/components/Chat/IncomeMessage";
import MessageInput from "@/components/Chat/MessageInput";
import OutgoingMessage from "@/components/Chat/OutgoingMessage";
import Wrapper from "@/components/Wrapper/Wrapper";
import { ITheme } from "@/constants/interfaces";
import { MessageDeliveredStatusType, MessageType } from "@/constants/types";
import { useChatSocket } from "@/hooks/useChatSocket";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useChatsStore } from "@/store/chatsStore";
import * as Crypto from "expo-crypto";
import { useRouter } from "expo-router";
import { useState } from "react";
import type { ListRenderItem } from "react-native";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

export default function ChatScreen() {
  const styles = useThemedStyles(createStyles);
  const { chats, addChatMessage, updateMessageStatus } = useChatsStore();
  const currentChat = chats.find((chat) => chat.id === "asd");
  const messages = currentChat?.messages;
  const router = useRouter();
  const [messageText, setMessageText] = useState("");

  const handleMessage = (message: MessageType) => {
    addChatMessage("asd", message);
    setMessageText("");
  };

  const handleMessageDeliveredStatus = (
    statusMessage: MessageDeliveredStatusType,
  ) => {
    updateMessageStatus(
      statusMessage.chatId,
      statusMessage.messageId,
      statusMessage.status,
    );
  };

  const { isConnected, sendMessage } = useChatSocket(
    handleMessage,
    handleMessageDeliveredStatus,
  );

  const onSend = () => {
    const message: MessageType = {
      chatId: currentChat?.id || "chat",
      messageId: Crypto.randomUUID(),
      type: "outgoing",
      content: messageText,
      createdAt: new Date(),
      userId: Crypto.randomUUID(),
      status: "sending",
    };

    if (isConnected) {
      sendMessage(message);
      addChatMessage("asd", message);
      setMessageText("");
    } else {
      Alert.alert("Нет подключения к серверу.");
    }
  };

  const renderMessage: ListRenderItem<MessageType> = ({ item }) => {
    return item.type === "outgoing" ? (
      <OutgoingMessage message={item} />
    ) : (
      <IncomeMessage message={item} />
    );
  };

  const chat = () => {
    return (
      <FlatList
        data={messages}
        keyExtractor={(item) => item.messageId}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <Wrapper backgroundColor={styles.wrapper.backgroundColor}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ChatHeader
          onBackPress={() => router.back()}
          isConnected={isConnected}
          title={currentChat?.title}
        />
        {messages && messages.length === 0 ? <EmptyChat /> : chat()}
        <MessageInput
          text={messageText}
          setText={setMessageText}
          onMessage={onSend}
          isConnected={isConnected}
        />
      </KeyboardAvoidingView>
    </Wrapper>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors1.mainBackground,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors1.mainBackground,
      paddingHorizontal: 16,
    },
    messageList: {
      paddingTop: 15,
      paddingBottom: 18,
    },
  });
