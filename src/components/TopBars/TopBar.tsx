import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import fontSizes from "../../constants/fontSizes";
import { ITheme } from "../../constants/interfaces";
import { useThemedStyles } from "../../hooks/useThemedStyles";

type TopBarProps = {
  title: string;
};

const TopBar: FC<TopBarProps> = ({ title }) => {
  const router = useRouter();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
        <Feather
          name="arrow-left-circle"
          size={32}
          color={styles.iconColor.color}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconButton} />
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: 50,
      backgroundColor: "transparent",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 15,
    },
    iconButton: {
      width: 40,
    },
    title: {
      color: theme.colors.text,
      fontSize: fontSizes.FONT18,
      fontFamily: "ComfortaaSemiBold",
    },
    iconColor: {
      color: theme.colors.text,
    },
  });

export default TopBar;
