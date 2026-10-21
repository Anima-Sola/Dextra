import Wrapper from "@/components/Wrapper/Wrapper";
import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  const styles = useThemedStyles(createStyles);

  return (
    <Wrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
      </View>
    </Wrapper>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    title: {
      textAlign: "center",
    },
  });
