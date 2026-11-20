import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { MessageType } from "@/constants/types";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { StyleSheet, Text, View } from "react-native";

type OutgoingMessageType = {
  message: MessageType;
};

export default function OutgoingMessage({ message }: OutgoingMessageType) {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.outgoingMessage}>
      <Text style={styles.messageContent}>{message.content}</Text>
    </View>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    outgoingMessage: {
      width: "80%",
      alignSelf: "flex-end",
      borderTopLeftRadius: 19,
      borderBottomLeftRadius: 19,
      borderBottomRightRadius: 19,
      borderTopRightRadius: 7,
      backgroundColor: theme.colors1.messageBackgoundColor,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginBottom: 20,
    },
    messageContent: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT14,
    },
  });
