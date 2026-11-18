import ActionsCard from "@/components/QuickActions/QuickActionCard";
import TopBar from "@/components/TopBars/TopBar";
import Wrapper from "@/components/Wrapper/Wrapper";
import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { useTheme } from "@/hooks/useTheme";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useQuickActionsStore } from "@/store/quickActionsStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList, StyleSheet, TextInput, View } from "react-native";

export default function QuickActionScreen() {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const { quickActions } = useQuickActionsStore();
  const actionColors = theme.colors1.actionCardBackgroundColors;
  const arrowColors = theme.colors1.actionCardArrowColors;

  return (
    <Wrapper backgroundColor={styles.wrapper.backgroundColor}>
      <View style={styles.container}>
        <TopBar />
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Название активности..."
            placeholderTextColor={styles.placeholderText.color}
            style={styles.searchInput}
          />
          <View style={styles.searchButton}>
            <Ionicons name="search" size={20} color={styles.iconColor.color} />
          </View>
        </View>
        <FlatList
          data={quickActions}
          numColumns={2}
          keyExtractor={(item) => `${item.titleUp}-${item.titleDown}`}
          columnWrapperStyle={styles.actionRow}
          contentContainerStyle={styles.actionList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ActionsCard
              iconName={item.iconName}
              titleUp={item.titleUp}
              titleDown={item.titleDown}
              backgroundColor={actionColors[item.colorIndex]}
              arrowColor={arrowColors[item.colorIndex]}
              orientation="vertical"
            />
          )}
        />
      </View>
    </Wrapper>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors1.mainBackground,
    },
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: theme.colors1.mainBackground,
    },
    actionList: {
      paddingBottom: 20,
    },
    actionRow: {
      justifyContent: "space-between",
      marginBottom: 8,
    },
    searchBar: {
      height: 47,
      borderRadius: 24,
      backgroundColor: theme.colors1.secondaryBackground,
      borderWidth: 1,
      borderColor: theme.colors1.border,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 13,
      paddingRight: 5,
      marginBottom: 13,
      shadowColor: theme.colors1.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      elevation: 2,
    },
    searchInput: {
      flex: 1,
      height: 44,
      paddingHorizontal: 10,
      fontSize: fontSizes.FONT14,
    },
    placeholderText: {
      color: theme.colors1.placholderText,
    },
    searchButton: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: theme.colors1.mainBackground,
      alignItems: "center",
      justifyContent: "center",
    },
    iconColor: {
      color: theme.colors1.accent,
    },
  });
