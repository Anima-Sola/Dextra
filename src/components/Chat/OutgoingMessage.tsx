import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { MessageType } from "@/constants/types";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type OutgoingMessageType = {
  message: MessageType;
};

export default function OutgoingMessage({ message }: OutgoingMessageType) {
  const styles = useThemedStyles(createStyles);

  const statusIcon = () => {
    switch (message.status) {
      case "delivered":
        return (
          <MaterialCommunityIcons
            name="check-all"
            size={18}
            color={styles.iconColor.color}
            style={styles.statusIcon}
          />
        );
      case "sending":
        return (
          <ActivityIndicator
            size="small"
            color={styles.iconColor.color}
            style={styles.statusIcon}
          />
        );
      case "notDelivered":
        return (
          <FontAwesome6
            name="triangle-exclamation"
            size={18}
            color={styles.notDeliveredIconColor.color}
            style={styles.statusIcon}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {statusIcon()}
      <View style={styles.outgoingMessage}>
        <Text style={styles.messageContent}>{message.content}</Text>
      </View>
    </View>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      marginBottom: 20,
    },
    outgoingMessage: {
      width: "80%",
      borderTopLeftRadius: 19,
      borderBottomLeftRadius: 19,
      borderBottomRightRadius: 19,
      borderTopRightRadius: 7,
      backgroundColor: theme.colors1.messageBackgoundColor,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginLeft: 5,
    },
    statusIcon: {
      width: 20,
      height: 20,
    },
    messageContent: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT14,
    },
    iconColor: {
      color: theme.colors1.accent,
    },
    notDeliveredIconColor: {
      color: theme.colors1.notDelivered,
    },
  });
