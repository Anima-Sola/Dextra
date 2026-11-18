import { ITheme } from "@/constants/interfaces";
import { useTheme } from "@/hooks/useTheme";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useRecentActionsStore } from "@/store/recentActionsStore";
import { StyleSheet, View } from "react-native";
import RecentActionCard from "./RecentActionCard";

export default function RecentActions() {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);

  const { recentActions } = useRecentActionsStore();
  const actionColors = theme.colors1.actionCardBackgroundColors;
  const arrowColors = theme.colors1.actionCardArrowColors;

  return (
    <View style={styles.actionList}>
      {recentActions.map((action, key) => (
        <RecentActionCard
          key={key}
          iconName={action.iconName}
          title={action.title}
          details={action.details}
          backgroundColor={actionColors[action.colorIndex]}
          arrowColor={arrowColors[action.colorIndex]}
        />
      ))}
    </View>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    actionList: {
      rowGap: 8,
    },
  });
