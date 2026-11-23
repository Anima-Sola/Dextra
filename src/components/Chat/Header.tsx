import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useSettingsStore } from "@/store/settingsStore";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ChatType = {
  onBackPress: () => void;
};

export default function ChatHeader({ onBackPress }: ChatType) {
  const styles = useThemedStyles(createStyles);
  const { appName } = useSettingsStore();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onBackPress}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={24}
          color={styles.iconColor.color}
        />
      </TouchableOpacity>
      <View style={styles.headerTitle}>
        <Text style={styles.agentName}>{appName}</Text>
        <Text style={styles.online}>
          <Text style={styles.onlineDot}>● </Text>Online
        </Text>
      </View>
      <TouchableOpacity style={styles.moreButton} activeOpacity={0.8}>
        <Text style={styles.more}>···</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    header: {
      height: 65,
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors1.border,
    },
    headerTitle: {
      flex: 1,
      paddingLeft: 10,
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
    agentName: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT16,
      fontWeight: "700",
    },
    online: {
      color: theme.colors1.secondaryText,
      fontSize: fontSizes.FONT11,
      marginTop: 1,
    },
    onlineDot: {
      color: theme.colors1.onlineDot,
    },
    more: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT20,
      fontWeight: "700",
      letterSpacing: 1,
    },
    moreButton: {
      width: 28,
      alignItems: "center",
    },
    iconColor: {
      color: theme.colors.text,
    },
  });
