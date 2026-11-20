import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

type MessageInputType = {
  text: string;
  setText: (value: string) => void;
  onMessage: () => void;
};

export default function MessageInput({
  text,
  setText,
  onMessage,
}: MessageInputType) {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.askBar}>
      <TouchableOpacity style={styles.attach}>
        <Ionicons name="attach" size={24} color={styles.clipIconColor.color} />
      </TouchableOpacity>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Спросите меня о чем-нибудь..."
        placeholderTextColor={styles.placeholderText.color}
        style={styles.askInput}
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={onMessage}
        disabled={text === ""}
      >
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color={styles.iconColor.color}
        />
      </TouchableOpacity>
    </View>
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
  });
