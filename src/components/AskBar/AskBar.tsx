import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

export default function AskBar() {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();

  return (
    <Pressable style={styles.askBar} onPress={() => router.push("/chat")}>
      <TextInput
        placeholder="Спросите меня о чем-нибудь..."
        placeholderTextColor={styles.placeholderText.color}
        style={styles.askInput}
        editable={false}
        onPress={() => router.push("/chat")}
      />
      <View style={styles.sendButton}>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color={styles.iconColor.color}
        />
      </View>
    </Pressable>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    askBar: {
      height: 47,
      borderRadius: 24,
      backgroundColor: theme.colors1.secondaryBackground,
      borderWidth: 1,
      borderColor: theme.colors1.border,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 13,
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
      paddingHorizontal: 10,
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
  });
