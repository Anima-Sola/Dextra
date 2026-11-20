import ProfileCard from "@/components/Settings/ProfileCard";
import TopBar from "@/components/TopBars/TopBar";
import Wrapper from "@/components/Wrapper/Wrapper";
import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const purple = "#4932ed";

type SettingRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress?: () => void;
};

function SettingRow({ icon, title, subtitle, onPress }: SettingRowProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <TouchableOpacity
      style={styles.settingRow}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={23} color={purple} />
      </View>
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={19} color="#4d5286" />
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const styles = useThemedStyles(createStyles);
  const [theme, setTheme] = useState<"Light" | "Dark" | "System">("Light");
  const [notifications, setNotifications] = useState(true);

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

          <Text style={styles.sectionTitle}>Тема</Text>
          <View style={styles.themeCard}>
            <View style={styles.rowIcon}>
              <Ionicons name="sunny-outline" size={24} color={purple} />
            </View>
            <View style={styles.themeCopy}>
              <Text style={styles.rowTitle}>Theme</Text>
              <Text style={styles.rowSubtitle}>{theme}</Text>
            </View>
            <View style={styles.themeOptions}>
              {(
                [
                  ["Light", "sunny-outline"],
                  ["Dark", "moon-outline"],
                  ["System", "desktop-outline"],
                ] as const
              ).map(([name, icon]) => (
                <TouchableOpacity
                  key={name}
                  style={[
                    styles.themeOption,
                    theme === name && styles.selectedTheme,
                  ]}
                  onPress={() => setTheme(name)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={icon}
                    size={19}
                    color={theme === name ? purple : "#414675"}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={[styles.themeCard, styles.notificationCard]}>
            <View style={styles.rowIcon}>
              <Ionicons name="notifications-outline" size={24} color={purple} />
            </View>
            <View style={styles.notificationCopy}>
              <Text style={styles.rowTitle}>Notifications</Text>
              <Text style={styles.rowSubtitle}>
                Get notified about new messages
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#d8d8e8", true: purple }}
              thumbColor="#ffffff"
              ios_backgroundColor="#d8d8e8"
            />
          </View>

          <Text style={[styles.sectionTitle, styles.appHeading]}>App</Text>
          <View style={styles.settingsGroup}>
            <SettingRow
              icon="globe-outline"
              title="Language"
              subtitle="English"
            />
            <SettingRow
              icon="stats-chart-outline"
              title="Data & Privacy"
              subtitle="Control your data"
            />
            <SettingRow
              icon="help-circle-outline"
              title="Help & Support"
              subtitle="Get help or contact us"
            />
            <SettingRow
              icon="information-circle-outline"
              title="About App"
              subtitle="Version 1.0.0"
            />
          </View>

          <TouchableOpacity style={styles.signOut} activeOpacity={0.75}>
            <Ionicons name="log-out-outline" size={21} color={purple} />
            <Text style={styles.signOutText}>Sign Out</Text>
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

    ///
    iconColor: {
      color: theme.colors.text,
    },

    avatarText: { color: "#514d73", fontSize: 15, fontWeight: "700" },
    onlineDot: {
      position: "absolute",
      right: -1,
      bottom: 1,
      width: 13,
      height: 13,
      borderRadius: 7,
      backgroundColor: "#25ce65",
      borderWidth: 2,
      borderColor: "#ffffff",
    },

    sectionTitle: {
      marginLeft: 16,
      marginBottom: 9,
      color: "#141529",
      fontSize: 16,
      fontWeight: "700",
    },
    themeCard: {
      minHeight: 64,
      paddingHorizontal: 11,
      paddingVertical: 8,
      borderRadius: 23,
      backgroundColor: "#ffffff",
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#7571b7",
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
    rowIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#f3f2ff",
      alignItems: "center",
      justifyContent: "center",
    },
    themeCopy: { flex: 1, marginLeft: 7 },
    rowTitle: { color: "#17182b", fontSize: 14, fontWeight: "500" },
    rowSubtitle: { color: "#73779f", fontSize: 12, marginTop: 2 },
    themeOptions: {
      flexDirection: "row",
      alignItems: "center",
      padding: 4,
      borderRadius: 17,
      backgroundColor: "#f5f4ff",
    },
    themeOption: {
      width: 39,
      height: 34,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    selectedTheme: { backgroundColor: "#dedbff" },
    notificationCard: { marginTop: 16, minHeight: 60, paddingHorizontal: 9 },
    notificationCopy: { flex: 1, marginLeft: 8 },
    appHeading: { marginTop: 23, marginBottom: 8 },
    settingsGroup: {
      paddingHorizontal: 10,
      borderRadius: 24,
      backgroundColor: "#ffffff",
      overflow: "hidden",
      shadowColor: "#7571b7",
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
    settingRow: {
      minHeight: 54,
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: "#e9e9f4",
    },
    rowCopy: { flex: 1, marginLeft: 10 },
    signOut: {
      height: 47,
      marginTop: 17,
      marginHorizontal: 2,
      borderRadius: 25,
      backgroundColor: "#eeedff",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
    },
    signOutText: { color: purple, fontSize: 14, fontWeight: "600" },
    composer: {
      position: "absolute",
      left: 28,
      right: 28,
      bottom: 10,
      height: 55,
      paddingLeft: 12,
      paddingRight: 7,
      borderRadius: 27,
      borderWidth: 1,
      borderColor: "#e5e3fb",
      backgroundColor: "#ffffff",
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#817ce0",
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    attachButton: {
      width: 32,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    input: { flex: 1, paddingVertical: 7, color: "#17182b", fontSize: 14 },
    sendButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: "#8979f5",
      alignItems: "center",
      justifyContent: "center",
    },
  });
