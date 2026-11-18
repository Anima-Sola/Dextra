import { ITheme } from "@/constants/interfaces";
import { useTheme } from "@/hooks/useTheme";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useQuickActionsStore } from "@/store/quickActionsStore";
import { ScrollView, StyleSheet, View } from "react-native";
import QuickActionsCard from "./QuickActionCard";

export default function QuickActions() {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const { quickActions } = useQuickActionsStore();
  const actionColors = theme.colors1.actionCardBackgroundColors;
  const arrowColors = theme.colors1.actionCardArrowColors;

  return (
    <View style={styles.actionGrid}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actionList}
      >
        {quickActions.map((action, key) => (
          <QuickActionsCard
            key={key}
            iconName={action.iconName}
            titleUp={action.titleUp}
            titleDown={action.titleDown}
            backgroundColor={actionColors[action.colorIndex]}
            arrowColor={arrowColors[action.colorIndex]}
            orientation="horizontal"
          />
        ))}
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    actionList: {
      flexDirection: "column",
      flexWrap: "wrap",
      columnGap: 8,
      rowGap: 8,
      height: 204,
    },
  });
