import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SettingRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
};

function SettingRow({ icon, title, subtitle = "", onPress }: SettingRowProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <TouchableOpacity
      style={styles.settingRow}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={23} color={styles.iconColor.color} />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.rowTitle}>{title}</Text>
        {subtitle && <Text style={styles.rowSubtitle}>{subtitle}</Text>}
      </View>
      <Ionicons
        name="chevron-forward"
        size={19}
        color={styles.nextIconColor.color}
      />
    </TouchableOpacity>
  );
}

export default function SettingsCard() {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.settingsGroup}>
      <SettingRow icon="globe-outline" title="Язык" subtitle="Русский" />
      <SettingRow
        icon="stats-chart-outline"
        title="Данные и конфиденциальность"
      />
      <SettingRow icon="help-circle-outline" title="Помощь & Поддержка" />
      <SettingRow
        icon="information-circle-outline"
        title="О приложении"
        subtitle="Версия 1.0.0"
      />
    </View>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    settingsGroup: {
      paddingHorizontal: 11,
      borderRadius: 24,
      backgroundColor: theme.colors1.secondaryBackground,
      overflow: "hidden",
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
    settingRow: {
      minHeight: 54,
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors1.border,
    },
    rowContainer: {
      flex: 1,
      marginLeft: 10,
    },
    rowTitle: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT15,
      fontWeight: "600",
      marginBottom: 2,
    },
    rowSubtitle: {
      color: theme.colors1.secondaryText,
      fontSize: fontSizes.FONT12,
      fontFamily: "ComfortaaBold",
    },
    iconColor: {
      color: theme.colors1.accent,
    },
    nextIconColor: {
      color: theme.colors1.mainText,
    },
  });
