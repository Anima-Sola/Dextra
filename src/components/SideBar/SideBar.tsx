import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useRouter } from "expo-router";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useChatsStore } from "../../store/chatsStore";
import { useUserStore } from "../../store/userStore";

const SideBar = () => {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const { name, avatar } = useUserStore();
  const { chats } = useChatsStore();

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
        {chats.map((chat) => (
          <Text key={chat.title} style={styles.chatTitle}>
            {chat.title}
          </Text>
        ))}
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
      borderRadius: 20,
      marginRight: 12,
    },
    avatarPlaceholder: {
      backgroundColor: theme.colors.background,
    },
    userName: {
      flex: 1,
      fontSize: 16,
      fontWeight: "600",
    },
    chatTitle: {
      paddingVertical: 12,
      fontSize: 15,
    },
  });

export default SideBar;
