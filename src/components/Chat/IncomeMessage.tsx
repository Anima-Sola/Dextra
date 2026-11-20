import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { MessageType } from "@/constants/types";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { StyleSheet, Text, View } from "react-native";

type IncomeMessageType = {
  message: MessageType;
};

export default function IncomeMessage({ message }: IncomeMessageType) {
  const styles = useThemedStyles(createStyles);

  return (
    <View>
      <Text style={styles.messageContent}>{message.content}</Text>
    </View>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    messageContent: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT14,
      marginBottom: 20,
    },
  });
