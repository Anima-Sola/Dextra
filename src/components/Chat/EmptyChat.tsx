import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { StyleSheet, Text, View } from "react-native";

export default function EmptyChat() {
  const styles = useThemedStyles(createStyles);

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
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
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
  });
