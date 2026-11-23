import NotificationsCard from "@/components/Settings/NotificationsCard";
import ProfileCard from "@/components/Settings/ProfileCard";
import SettingsCard from "@/components/Settings/SettingsCard";
import ThemeCard from "@/components/Settings/ThemeCard";
import TopBar from "@/components/TopBars/TopBar";
import Wrapper from "@/components/Wrapper/Wrapper";
import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const styles = useThemedStyles(createStyles);

  return (
    <Wrapper backgroundColor={styles.wrapper.backgroundColor}>
      <View style={styles.container}>
        <TopBar title="Настройки" />
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <ProfileCard />
          <ThemeCard />
          <NotificationsCard />
          <SettingsCard />

          <TouchableOpacity style={styles.signOut} activeOpacity={0.8}>
            <Ionicons
              name="log-out-outline"
              size={21}
              color={styles.iconColor.color}
            />
            <Text style={styles.signOutText}>Выход</Text>
          </TouchableOpacity>
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
      paddingHorizontal: 16,
    },
    content: {
      paddingBottom: 105,
    },
    signOut: {
      height: 47,
      marginTop: 17,
      marginHorizontal: 2,
      borderRadius: 25,
      backgroundColor: theme.colors1.secondaryBackground,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
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
    signOutText: {
      color: theme.colors1.accent,
      fontSize: fontSizes.FONT14,
      fontWeight: "600",
    },
    iconColor: {
      color: theme.colors1.accent,
    },
  });
