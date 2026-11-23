import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function NotificationsCard() {
  const styles = useThemedStyles(createStyles);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.themeCard}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color={styles.trackTrue.color}
        />
      </View>
      <View style={styles.notificationsInfoContainer}>
        <Text style={styles.notificationsTitle}>Уведомления</Text>
      </View>
      <View style={styles.switchContainer}>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{
            false: styles.trackFalse.color,
            true: styles.trackTrue.color,
          }}
          thumbColor={styles.thumbColor.color}
          ios_backgroundColor={styles.iosBackgroundColor.color}
        />
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
      backgroundColor: theme.colors1.secondaryBackground,
      marginBottom: 10,
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
    notificationsInfoContainer: {
      flex: 1,
      marginLeft: 7,
    },
    switchContainer: {
      width: 51,
      height: 48,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 11,
    },
    notificationsTitle: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT14,
      fontWeight: "500",
    },
    iconColor: {
      color: theme.colors1.mainText,
    },
    thumbColor: {
      color: theme.colors1.secondaryBackground,
    },
    iosBackgroundColor: {
      color: theme.colors1.accent,
    },
    trackTrue: {
      color: theme.colors1.accent,
    },
    trackFalse: {
      color: theme.colors1.placholderText,
    },
  });
