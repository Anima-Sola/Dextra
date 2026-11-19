import Wrapper from "@/components/Wrapper/Wrapper";
import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { MessageType } from "@/constants/types";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useChatsStore } from "@/store/chatsStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useUserStore } from "@/store/userStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PURPLE = "#6854FF";
const INK = "#11183E";

export default function ChatScreen() {
  const styles = useThemedStyles(createStyles);
  const { currentChatIndex, chats } = useChatsStore();
  const router = useRouter();
  const { userId } = useUserStore();
  const [draft, setDraft] = useState("");
  const messages: MessageType[] = chats[currentChatIndex]?.messages ?? [];
  const { appName, appIcon } = useSettingsStore();

  const renderMessage = ({ item }: { item: MessageType }) => {
    const outgoing = item.user._id === userId;
    const time = `${item.createdAt.getHours()}:${String(item.createdAt.getMinutes()).padStart(2, "0")}`;

    return (
      <View
        style={[
          styles.messageRow,
          outgoing ? styles.outgoingRow : styles.incomingRow,
        ]}
      >
        {!outgoing && <View style={styles.avatar}>{appIcon}</View>}
        <View
          style={[
            styles.bubble,
            outgoing ? styles.outgoingBubble : styles.incomingBubble,
          ]}
        >
          <Text style={[styles.messageText, outgoing && styles.outgoingText]}>
            {item.text}
          </Text>
          <Text style={[styles.time, outgoing && styles.outgoingTime]}>
            {time}
          </Text>
        </View>
        {outgoing && (
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>Я</Text>
          </View>
        )}
      </View>
    );
  };

  const header = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color={styles.backIconColor.color}
          />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.agentName}>{appName}</Text>
          <Text style={styles.online}>
            <Text style={styles.onlineDot}>● </Text>Online
          </Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.more}>···</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const emptyChat = () => {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.greeting}>
          Привет! Я ИИ агент. <Text style={styles.sun}>✨</Text>
        </Text>
        <Text style={styles.description}>
          Я могу помочь тебе с заданиями в реальном мире: купить билеты,
          забронировать столик и т.д.
        </Text>
      </View>
    );
  };

  const chat = () => {
    return (
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const askBar = () => {
    return (
      <View style={styles.askBar}>
        <TouchableOpacity
          style={styles.attach}
          accessibilityLabel="Attach file"
        >
          <Ionicons
            name="attach"
            size={24}
            color={styles.clipIconColor.color}
          />
        </TouchableOpacity>

        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Спросите меня о чем-нибудь..."
          placeholderTextColor={styles.placeholderText.color}
          style={styles.askInput}
        />
        <View style={styles.sendButton}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color={styles.iconColor.color}
          />
        </View>
      </View>
    );
  };

  return (
    <Wrapper backgroundColor={styles.wrapper.backgroundColor}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {header()}
        {messages.length === 0 ? emptyChat() : chat()}
        {askBar()}
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
    header: {
      height: 76,
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors1.border,
    },
    headerTitle: {
      flex: 1,
      paddingLeft: 10,
    },
    agentName: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT16,
      fontWeight: "700",
    },
    online: {
      color: theme.colors1.secondaryText,
      fontSize: fontSizes.FONT11,
      marginTop: 1,
    },
    onlineDot: {
      color: theme.colors1.onlineDot,
    },
    more: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT20,
      fontWeight: "700",
      letterSpacing: 1,
    },
    moreButton: {
      width: 28,
      alignItems: "center",
    },
    emptyState: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 8,
    },
    greeting: {
      color: theme.colors1.mainText,
      fontWeight: "700",
      fontSize: fontSizes.FONT18,
      textAlign: "center",
      marginBottom: 9,
    },
    sun: {
      fontSize: fontSizes.FONT18,
    },
    description: {
      color: theme.colors1.secondaryText,
      fontSize: fontSizes.FONT14,
      lineHeight: 20,
      textAlign: "center",
      marginBottom: 26,
      fontFamily: "ComfortaaBold",
      width: "80%",
    },
    messageList: {
      paddingHorizontal: 16,
      paddingTop: 15,
      paddingBottom: 18,
    },

    //Middle

    askBar: {
      height: 47,
      borderRadius: 24,
      backgroundColor: theme.colors1.secondaryBackground,
      borderWidth: 1,
      borderColor: theme.colors1.border,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 10,
      paddingRight: 5,
      marginBottom: 22,
      shadowColor: theme.colors1.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      elevation: 2,
    },
    askInput: {
      flex: 1,
      height: 44,
      fontSize: fontSizes.FONT14,
    },
    sendButton: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: theme.colors1.accent,
      alignItems: "center",
      justifyContent: "center",
    },
    placeholderText: {
      color: theme.colors1.placholderText,
    },
    iconColor: {
      color: theme.colors1.secondaryBackground,
    },
    clipIconColor: {
      color: theme.colors.text,
    },
    backIconColor: {
      color: theme.colors.text,
    },

    ///

    iconButton: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: theme.colors1.secondaryBackground,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme.colors1.border,
      shadowColor: theme.colors1.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      elevation: 2,
    },

    backButton: { width: 42, justifyContent: "center" },
    back: { color: INK, fontSize: 32, lineHeight: 34 },
    headerMark: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: "#F0EEFF",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 9,
    },

    hero: {
      width: 180,
      height: 178,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
    heroGlow: {
      position: "absolute",
      width: 114,
      height: 114,
      borderRadius: 60,
      backgroundColor: "#EFEDFF",
      right: 14,
      top: 31,
    },
    twinkle: {
      position: "absolute",
      color: "#BFD6FF",
      fontSize: 21,
      right: 0,
      top: 27,
    },
    twinkleSmall: {
      position: "absolute",
      color: "#BFD6FF",
      fontSize: 14,
      left: 9,
      bottom: 42,
    },

    suggestions: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: 10,
    },
    suggestion: {
      width: "48.5%",
      minHeight: 44,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#E4E6F7",
      borderRadius: 24,
      backgroundColor: "#FFFFFF",
    },
    suggestionIcon: { color: "#397BFF", fontSize: 16, marginRight: 8 },
    suggestionText: { color: INK, fontSize: 11, fontWeight: "500" },

    messageRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginBottom: 13,
    },
    incomingRow: { justifyContent: "flex-start" },
    outgoingRow: { justifyContent: "flex-end" },
    avatar: {
      width: 31,
      height: 31,
      borderRadius: 16,
      backgroundColor: "#F0EEFF",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 9,
      marginBottom: 5,
    },
    userAvatar: {
      width: 27,
      height: 27,
      borderRadius: 14,
      backgroundColor: "#D5E4E8",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 8,
      marginBottom: 5,
    },
    userAvatarText: { color: "#405A65", fontSize: 12, fontWeight: "700" },
    bubble: {
      maxWidth: "78%",
      paddingHorizontal: 13,
      paddingTop: 10,
      paddingBottom: 8,
      borderRadius: 19,
    },
    incomingBubble: { backgroundColor: "#F0F1F8", borderTopLeftRadius: 7 },
    outgoingBubble: { backgroundColor: "#EAE7FF", borderTopRightRadius: 7 },
    messageText: { color: INK, fontSize: 14, lineHeight: 20 },
    outgoingText: { color: "#191543" },
    time: { color: "#8188A7", fontSize: 10, marginTop: 5 },
    outgoingTime: { textAlign: "right", color: "#7470B7" },
    composer: {
      minHeight: 49,
      marginHorizontal: 14,
      marginBottom: 7,
      borderRadius: 28,
      borderWidth: 1,
      borderColor: "#E6E8F7",
      backgroundColor: "#FFFFFF",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      shadowColor: "#454C80",
      shadowOpacity: 0.07,
      shadowRadius: 9,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
    attach: { width: 31, alignItems: "flex-start", justifyContent: "center" },
    attachIcon: {
      color: "#7B83A8",
      fontSize: 22,
      transform: [{ rotate: "-35deg" }],
    },
    input: { flex: 1, color: INK, fontSize: 13, paddingVertical: 8 },
    sendButton2: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: PURPLE,
      alignItems: "center",
      justifyContent: "center",
    },
    sendIcon: { color: "#FFFFFF", fontSize: 22, lineHeight: 25 },
    homeIndicator: {
      width: 100,
      height: 4,
      borderRadius: 3,
      backgroundColor: "#080A17",
      alignSelf: "center",
      marginTop: 3,
      marginBottom: 5,
    },
  });
