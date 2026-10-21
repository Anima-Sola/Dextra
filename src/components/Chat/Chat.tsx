import TopBar from "@/components/TopBar/TopBar";
import { ITheme } from "@/constants/interfaces";
import { BottomTabInset } from "@/constants/theme";
import { MessageType } from "@/constants/types";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useChatsStore } from "@/store/chatsStore";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

type ChatProps = {
  onMenuPress: () => void;
};

const Chat = ({ onMenuPress }: ChatProps) => {
  const styles = useThemedStyles(createStyles);
  const { currentChatIndex, chats } = useChatsStore();
  const [messages, setMessages] = useState(chats[currentChatIndex].messages);

  const onSend = useCallback((messages: MessageType[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <View style={styles.container}>
      <TopBar onMenuPress={onMenuPress} />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        //keyboardAvoidingViewProps={{ keyboardVerticalOffset: headerHeight }}
      />
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: BottomTabInset,
      backgroundColor: "transparent",
    },
  });

export default Chat;
