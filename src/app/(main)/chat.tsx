import EmptyChat from "@/components/Chat/EmptyChat";
import ChatHeader from "@/components/Chat/Header";
import IncomeMessage from "@/components/Chat/IncomeMessage";
import MessageInput from "@/components/Chat/MessageInput";
import OutgoingMessage from "@/components/Chat/OutgoingMessage";
import Wrapper from "@/components/Wrapper/Wrapper";
import { ITheme } from "@/constants/interfaces";
import { MessageType } from "@/constants/types";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useChatsStore } from "@/store/chatsStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import type { ListRenderItem } from "react-native";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

export default function ChatScreen() {
  const styles = useThemedStyles(createStyles);
  const { chats, addChatMessage } = useChatsStore();
  const messages = chats.find((chat) => chat.id === "asd")?.messages;
  const router = useRouter();
  const [text, setText] = useState("");

  const handleMessage = () => {
    const newMessage: MessageType = {
      id: "sd22f",
      type: "outgoing",
      content: "Это новое сообщение",
      createdAt: new Date(),
      userId: "user",
    };

    const newMessage2: MessageType = {
      id: "sd22f1",
      type: "income",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      createdAt: new Date(),
      userId: "user",
    };

    addChatMessage("asd", newMessage);
    addChatMessage("asd", newMessage2);
    setText("");
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
        keyExtractor={(item) => item.id}
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
        <ChatHeader onBackPress={() => router.back()} />
        {messages && messages.length === 0 ? <EmptyChat /> : chat()}
        <MessageInput text={text} setText={setText} onMessage={handleMessage} />
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
