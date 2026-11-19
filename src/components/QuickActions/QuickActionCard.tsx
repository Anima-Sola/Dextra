import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { screenWidth } from "@/constants/sizes";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { ComponentProps } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type QuickActionsCardProps = {
  iconName: ComponentProps<typeof MaterialCommunityIcons>["name"];
  titleUp: string;
  titleDown: string;
  backgroundColor: string;
  arrowColor: string;
  orientation: "horizontal" | "vertical";
};

export default function QuickActionsCard({
  iconName,
  titleUp,
  titleDown,
  backgroundColor,
  arrowColor,
  orientation,
}: QuickActionsCardProps) {
  const styles = useThemedStyles(createStyles);
  const width =
    orientation === "horizontal" ? (screenWidth * 43) / 100 : "48.5%";

  return (
    <TouchableOpacity style={[styles.actionCard, { backgroundColor, width }]}>
      <MaterialCommunityIcons name={iconName} size={24} color={arrowColor} />
      <View style={styles.actionBottom}>
        <View>
          <Text style={styles.actionText}>{titleUp}</Text>
          <Text style={styles.actionText}>{titleDown}</Text>
        </View>
        <Text style={[styles.actionArrow, { color: arrowColor }]}>➜</Text>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    actionCard: {
      minHeight: 98,
      borderRadius: 15,
      padding: 12,
      justifyContent: "space-between",
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
    actionBottom: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
    },
    actionText: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT13,
      lineHeight: 16,
      fontFamily: "ComfortaaBold",
    },
    actionArrow: {
      fontSize: fontSizes.FONT14,
      marginBottom: 1,
    },
  });
