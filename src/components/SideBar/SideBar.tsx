import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useChatsStore } from "../../store/chatsStore";
import { useUserStore } from "../../store/userStore";

type SideBarProps = {
  onChatSelect: () => void;
};

const SideBar = ({ onChatSelect }: SideBarProps) => {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const { name, avatar } = useUserStore();
  const {
    currentChatIndex,
    setCurrentChatIndex,
    chats,
    deleteChat,
    clearChatMessages,
    updateChatTitle,
  } = useChatsStore();

  const selectChat = (chatId: number) => {
    setCurrentChatIndex(chatId);
    onChatSelect?.();
  };

  const deleteChatById = (chatId: number) => {
    if (chats.length === 1) {
      clearChatMessages(chatId);
      updateChatTitle(chatId, `Новый чат`);
      onChatSelect?.();
      return;
    }

    deleteChat(chatId);

    if (chatId <= currentChatIndex && currentChatIndex > 0) {
      setCurrentChatIndex(currentChatIndex - 1);
    }

    onChatSelect?.();
  };

  const isEmpty =
    chats[currentChatIndex].messages.length === 0 && chats.length === 1;

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push("/settings")}>
        <View style={styles.userRow}>
          <Image source={avatar} style={styles.avatar} />
          <Text style={styles.userName} numberOfLines={1}>
            {name}
          </Text>
        </View>
      </Pressable>

      <ScrollView>
        {chats.map((chat, key) => {
          const chatTitleStyle =
            currentChatIndex === key
              ? styles.currentChatTitle
              : styles.chatTitle;

          const chatContanerStyle =
            currentChatIndex === key
              ? styles.currentChatContainer
              : styles.chatContainer;

          return (
            <Pressable
              key={key}
              style={chatContanerStyle}
              onPress={() => selectChat(key)}
            >
              <Text style={chatTitleStyle}>{chat.title}</Text>
              {!isEmpty && (
                <TouchableOpacity onPress={() => deleteChatById(key)}>
                  <Feather
                    name="trash-2"
                    size={22}
                    color={styles.iconColor.color}
                  />
                </TouchableOpacity>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      width: "80%",
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
    userRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 24,
      marginRight: 12,
    },
    avatarPlaceholder: {
      backgroundColor: theme.colors.background,
    },
    userName: {
      flex: 1,
      fontSize: fontSizes.FONT18,
      fontWeight: "600",
      color: theme.colors.text,
      fontFamily: "ComfortaaSemiBold",
    },
    chatTitle: {
      paddingVertical: 8,
      paddingHorizontal: 8,
      fontSize: fontSizes.FONT15,
      color: theme.colors.text,
      fontFamily: "ComfortaaRegular",
    },
    currentChatTitle: {
      paddingVertical: 8,
      paddingHorizontal: 8,
      fontSize: fontSizes.FONT15,
      color: theme.colors.text,
      fontFamily: "ComfortaaRegular",
    },
    chatContainer: {
      borderWidth: 1,
      borderColor: theme.colors.background,
      marginVertical: 2,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingRight: 4,
    },
    currentChatContainer: {
      backgroundColor: theme.colors.backgroundElement,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.backgroundSelected,
      marginVertical: 2,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingRight: 4,
    },
    iconColor: {
      color: theme.colors.text,
    },
  });

export default SideBar;
