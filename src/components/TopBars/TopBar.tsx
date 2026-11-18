import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import fontSizes from "../../constants/fontSizes";
import { ITheme } from "../../constants/interfaces";
import { useThemedStyles } from "../../hooks/useThemedStyles";

type TopBarProps = {
  title?: string;
};

const TopBar: FC<TopBarProps> = ({ title = "" }) => {
  const router = useRouter();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={24}
          color={styles.iconColor.color}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.empty} />
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
    },
    iconButton: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: theme.colors1.secondaryBackground,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme.colors1.border,
      shadowColor: theme.colors1.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      elevation: 2,
    },
    title: {
      color: theme.colors.text,
      fontSize: fontSizes.FONT18,
      fontFamily: "ComfortaaSemiBold",
    },
    iconColor: {
      color: theme.colors.text,
    },
    empty: {
      width: 34,
      height: 34,
    },
  });

export default TopBar;
