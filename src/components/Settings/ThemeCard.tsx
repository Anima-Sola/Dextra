import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useSettingsStore } from "@/store/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const themeOptions = [
  { mode: "system", label: "Система", icon: "phone-portrait-outline" },
  { mode: "light", label: "Светлая", icon: "sunny-outline" },
  { mode: "dark", label: "Темная", icon: "moon-outline" },
] as const;

export default function ThemeCard() {
  const styles = useThemedStyles(createStyles);
  const mode = useSettingsStore((state) => state.mode);
  const setMode = useSettingsStore((state) => state.setMode);

  let themeIcon: ComponentProps<typeof Ionicons>["name"];
  let themeName = "";

  switch (mode) {
    case "system":
      themeIcon = "phone-portrait-outline";
      themeName = "Системная";
      break;
    case "light":
      themeIcon = "sunny-outline";
      themeName = "Светлая";
      break;
    case "dark":
      themeIcon = "moon-outline";
      themeName = "Темная";
  }

  return (
    <View style={styles.themeCard}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={themeIcon}
          size={24}
          color={styles.selectedIconColor.color}
        />
      </View>
      <View style={styles.themeInfoContainer}>
        <Text style={styles.themeTitle}>Тема</Text>
        <Text style={styles.themeName}>{themeName}</Text>
      </View>
      <View style={styles.themeOptions}>
        {themeOptions.map((theme) => (
          <TouchableOpacity
            key={theme.mode}
            style={[
              styles.themeOption,
              theme.mode === mode && styles.selectedTheme,
            ]}
            onPress={() => setMode(theme.mode)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={theme.icon}
              size={19}
              color={
                theme.mode === mode
                  ? styles.selectedIconColor.color
                  : styles.iconColor.color
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    themeCard: {
      minHeight: 64,
      paddingHorizontal: 11,
      paddingVertical: 8,
      borderRadius: 23,
      marginBottom: 10,
      backgroundColor: theme.colors1.secondaryBackground,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors1.border,
      shadowColor: theme.colors1.shadow,
      shadowOpacity: 0.06,
      shadowRadius: 7,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      elevation: 1,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors1.messageBackgoundColor,
      alignItems: "center",
      justifyContent: "center",
    },
    themeInfoContainer: {
      flex: 1,
      marginLeft: 7,
    },
    themeTitle: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT14,
      fontWeight: "500",
    },
    themeName: {
      marginTop: 2,
      color: theme.colors1.secondaryText,
      fontSize: fontSizes.FONT12,
      fontFamily: "ComfortaaBold",
    },
    themeOptions: {
      flexDirection: "row",
      alignItems: "center",
      padding: 4,
      borderRadius: 17,
      backgroundColor: theme.colors1.mainBackground,
      borderWidth: 1,
      borderColor: theme.colors1.border,
      shadowColor: theme.colors1.shadow,
      shadowOpacity: 0.06,
      shadowRadius: 7,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      elevation: 1,
    },
    themeOption: {
      width: 39,
      height: 34,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    selectedTheme: {
      backgroundColor: theme.colors1.messageBackgoundColor,
    },
    iconColor: {
      color: theme.colors1.mainText,
    },
    selectedIconColor: {
      color: theme.colors1.accent,
    },
  });
