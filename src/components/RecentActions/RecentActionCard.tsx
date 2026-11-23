import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { ComponentProps } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type RecentActionsCardProps = {
  iconName: ComponentProps<typeof MaterialCommunityIcons>["name"];
  title: string;
  details: string;
  backgroundColor: string;
  arrowColor: string;
};

export default function RecentActionCard({
  iconName,
  title,
  details,
  backgroundColor,
  arrowColor,
}: RecentActionsCardProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <TouchableOpacity
      style={[styles.activityCard, { backgroundColor }]}
      activeOpacity={0.8}
    >
      <MaterialCommunityIcons name={iconName} size={24} color={arrowColor} />
      <View style={styles.action}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionDetails}>{details}</Text>
      </View>
      <Text style={[styles.chevron, , { color: arrowColor }]}>➜</Text>
    </TouchableOpacity>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    activityCard: {
      minHeight: 62,
      paddingHorizontal: 10,
      borderRadius: 14,
      backgroundColor: theme.colors1.secondaryBackground,
      borderWidth: 1,
      borderColor: theme.colors1.border,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: theme.colors1.shadow,
      shadowOpacity: 0.06,
      shadowRadius: 7,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      elevation: 1,
    },
    action: {
      flex: 1,
      marginLeft: 10,
    },
    actionTitle: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT13,
      fontFamily: "ComfortaaBold",
    },
    actionDetails: {
      color: theme.colors1.secondaryText,
      fontSize: fontSizes.FONT12,
      marginTop: 3,
    },
    chevron: {
      color: theme.colors1.secondaryText,
      fontSize: fontSizes.FONT14,
      paddingHorizontal: 3,
    },
  });
