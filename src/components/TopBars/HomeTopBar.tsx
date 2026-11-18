import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useSettingsStore } from "@/store/settingsStore";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeTopBar() {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const { appName, appIcon } = useSettingsStore();
  const avatar = useUserStore((state) => state.avatar);

  return (
    <View style={styles.container}>
      <View style={styles.app}>
        <Text style={styles.appIcon}>{appIcon}</Text>
        <Text style={styles.appName}>{appName}</Text>
      </View>
      <Pressable
        style={styles.avatarContainer}
        onPress={() => router.push("/settings")}
      >
        <Image source={avatar} style={styles.avatarImage} />
      </Pressable>
    </View>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
      paddingHorizontal: 16,
    },
    app: {
      flexDirection: "row",
      alignItems: "center",
    },
    appIcon: {
      color: theme.colors1.accent,
      fontSize: fontSizes.FONT20,
      marginRight: 5,
    },
    appName: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT16,
      fontWeight: "700",
    },
    avatarContainer: {
      width: 42,
      height: 42,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    avatarImage: {
      width: 42,
      height: 42,
    },
  });
