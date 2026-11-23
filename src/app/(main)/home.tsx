import AskBar from "@/components/AskBar/AskBar";
import QuickActions from "@/components/QuickActions/QuickActions";
import RecentActions from "@/components/RecentActions/RecentActions";
import HomeTopBar from "@/components/TopBars/HomeTopBar";
import Wrapper from "@/components/Wrapper/Wrapper";
import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();

  return (
    <Wrapper backgroundColor={styles.wrapper.backgroundColor}>
      <View style={styles.container}>
        <HomeTopBar />
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.greetingText}>
            Привет!👋 Чем займемся сегодня?
          </Text>

          <AskBar />

          <View style={styles.quickActionsHeader}>
            <Text style={styles.quickActionsHeaderText}>Быстрые действия</Text>
            <TouchableOpacity
              onPress={() => router.push("/quickActions")}
              activeOpacity={0.8}
            >
              <Text style={styles.seeAll}>Все действия →</Text>
            </TouchableOpacity>
          </View>

          <QuickActions />

          <View style={styles.recentActionsHeading}>
            <Text style={styles.recentActionsHeadingText}>
              Последняя активность
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/recentActions")}
              activeOpacity={0.8}
            >
              <Text style={styles.seeAll}>Все действия →</Text>
            </TouchableOpacity>
          </View>

          <RecentActions />
        </ScrollView>
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
      backgroundColor: theme.colors1.mainBackground,
    },
    content: {
      paddingHorizontal: 16,
      paddingTop: 10,
      paddingBottom: 20,
    },
    greetingText: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT18,
      marginBottom: 10,
      fontWeight: "500",
    },
    quickActionsHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 10,
    },
    quickActionsHeaderText: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT16,
    },
    recentActionsHeading: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 30,
      marginBottom: 10,
    },
    recentActionsHeadingText: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT16,
    },
    seeAll: {
      color: theme.colors1.accent,
      fontSize: 12,
      fontWeight: "600",
    },
  });
