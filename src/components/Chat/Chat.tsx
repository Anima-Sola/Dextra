import TopBar from "@/components/TopBar/TopBar";
import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { MessageType } from "@/constants/types";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useChatsStore } from "@/store/chatsStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback } from "react";
import { Alert, Image, Platform, StyleSheet, Text, View } from "react-native";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";

import { useSafeAreaInsets } from "react-native-safe-area-context";

type ChatProps = {
  onMenuPress: () => void;
  isInteractionDisabled: boolean;
};

const Chat = ({ onMenuPress, isInteractionDisabled }: ChatProps) => {
  const styles = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();
  const {
    currentChatIndex,
    chats,
    updateCurrentChatMessages,
    addChat,
    setCurrentChatIndex,
  } = useChatsStore();
  const messages = chats[currentChatIndex].messages;

  const onSend = useCallback(
    (newMessages: MessageType[] = []) => {
      updateCurrentChatMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages),
      );
    },
    [updateCurrentChatMessages],
  );

  const createNewChat = () => {
    if (messages.length === 0) {
      Alert.alert("Вы уже в новом чате.");
      return;
    }

    addChat(`Новый чат ${chats.length + 1}`);
    setCurrentChatIndex(chats.length);
  };

  return (
    <View
      pointerEvents={isInteractionDisabled ? "none" : "auto"}
      style={styles.container}
    >
      <TopBar onMenuPress={onMenuPress} onAddPress={createNewChat} />
      <GiftedChat
        messages={messages}
        onSend={onSend}
        textInputProps={{
          placeholder: "Введите сообщение...",
          placeholderTextColor: styles.placeholderText.color,
        }}
        isDayAnimationEnabled={false}
        keyboardAvoidingViewProps={{
          keyboardVerticalOffset: insets.bottom + 45,
        }}
        user={{
          _id: 1,
        }}
        renderDay={() => null}
        renderTime={() => null}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: styles.incomingMessageBubble,
              right: styles.outgoingMessageBubble,
            }}
            textStyle={{
              left: styles.incomingMessageText,
              right: styles.outgoingMessageText,
            }}
          />
        )}
        renderChatEmpty={() => (
          <View style={styles.emptyChat}>
            <Image
              source={require("../../../assets/images/Icons/logo.png")}
              style={styles.emptyLogo}
              resizeMode="contain"
              accessible={false}
            />
            <Text style={styles.emptyText}>Привет, что ты хочешь?</Text>
          </View>
        )}
        listProps={{
          contentContainerStyle: styles.contentContainerStyle,
        }}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={styles.inputToolbar}
            primaryStyle={styles.inputToolbarPrimary}
          />
        )}
        renderSend={(props) => (
          <Send {...props} containerStyle={styles.sendContainer}>
            <View style={styles.sendButton}>
              <Ionicons name="send" size={28} color={styles.iconColor.color} />
            </View>
          </Send>
        )}
      />
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "transparent",
    },
    contentContainerStyle: {
      flexGrow: 1,
      paddingBottom: 10,
    },
    emptyChat: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
      marginTop: 50,
      transform:
        Platform.OS === "ios"
          ? [{ scaleY: -1 }]
          : [{ scaleY: -1 }, { scaleX: -1 }],
    },
    emptyLogo: {
      width: 50,
      height: 50,
      marginBottom: 5,
    },
    emptyText: {
      color: theme.colors.text,
      fontSize: fontSizes.FONT18,
      textAlign: "center",
      fontFamily: "ComfortaaSemiBold",
    },
    inputToolbar: {
      marginHorizontal: 12,
      marginBottom: 12,
      borderTopWidth: 0,
      borderRadius: 24,
      backgroundColor: theme.colors.backgroundElement,
      overflow: "hidden",
    },
    inputToolbarPrimary: {
      minHeight: 48,
      alignItems: "center",
      paddingHorizontal: 6,
      paddingVertical: 4,
    },
    sendContainer: {
      alignSelf: "center",
      justifyContent: "center",
    },
    sendButton: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    iconColor: {
      color: theme.colors.text,
    },
    placeholderText: {
      color: theme.colors.textSecondary,
    },
    incomingMessageBubble: {
      backgroundColor: theme.colors.background,
      borderRadius: 18,
      borderBottomLeftRadius: 6,
      marginLeft: 8,
      marginVertical: 4,
      padding: 4,
      maxWidth: "78%",
      borderWidth: 1,
      borderColor: theme.colors.backgroundSelected,
    },
    outgoingMessageBubble: {
      backgroundColor: theme.colors.backgroundSelected,
      borderRadius: 18,
      borderBottomRightRadius: 6,
      marginRight: 8,
      marginVertical: 4,
      padding: 4,
      maxWidth: "78%",
    },
    incomingMessageText: {
      color: theme.colors.text,
      fontSize: fontSizes.FONT16,
      lineHeight: 22,
    },
    outgoingMessageText: {
      color: theme.colors.text,
      fontSize: fontSizes.FONT16,
      lineHeight: 22,
    },
  });

export default Chat;
