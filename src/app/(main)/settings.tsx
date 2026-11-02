import TopBar from "@/components/TopBars/TopBar";
import Wrapper from "@/components/Wrapper/Wrapper";
import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useSettingsStore } from "@/store/settingsStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

const themeOptions = [
  { mode: "system", label: "Система", icon: "phone-portrait-outline" },
  { mode: "light", label: "Светлая", icon: "sunny-outline" },
  { mode: "dark", label: "Темная", icon: "moon-outline" },
] as const;

export default function SettingsScreen() {
  const styles = useThemedStyles(createStyles);
  const mode = useSettingsStore((state) => state.mode);
  const setMode = useSettingsStore((state) => state.setMode);

  return (
    <Wrapper backgroundColor={styles.wrapper.backgroundColor}>
      <View style={styles.container}>
        <TopBar title="Настройки" />
        <Text style={styles.sectionTitle}>Внешний вид</Text>
        <View style={styles.optionList}>
          {themeOptions.map((option, index) => {
            const isSelected = mode === option.mode;

            return (
              <Pressable
                key={option.mode}
                accessibilityRole="radio"
                accessibilityState={{ checked: isSelected }}
                onPress={() => setMode(option.mode)}
                style={({ pressed }) => [
                  styles.optionRow,
                  index < themeOptions.length - 1 && styles.optionDivider,
                  pressed && styles.optionPressed,
                ]}
              >
                <Ionicons
                  name={option.icon}
                  size={24}
                  color={styles.iconColor.color}
                />
                <Text style={styles.settingLabel}>{option.label}</Text>
                {isSelected && (
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color={styles.iconColor.color}
                    style={styles.checkmark}
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </Wrapper>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.backgroundElement,
    },
    container: {
      flex: 1,
    },
    optionList: {
      marginHorizontal: 16,
      borderRadius: 12,
      overflow: "hidden",
    },
    sectionTitle: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      fontFamily: "ComfortaaSemiBold",
      paddingHorizontal: 16,
      paddingBottom: 8,
      paddingTop: 16,
    },
    optionRow: {
      minHeight: 56,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.background,
    },
    optionDivider: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.backgroundSelected,
    },
    optionPressed: {
      backgroundColor: theme.colors.backgroundSelected,
    },
    settingLabel: {
      color: theme.colors.text,
      fontSize: 16,
      fontFamily: "ComfortaaRegular",
    },
    iconColor: {
      color: theme.colors.text,
    },
    checkmark: {
      marginLeft: "auto",
    },
  });
