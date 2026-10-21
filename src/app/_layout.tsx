import { useSettingsStore } from "@/store/settingsStore";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const { setResolvedTheme, mode } = useSettingsStore();
  const systemColorScheme = useColorScheme();

  useEffect(() => {
    if (mode === "system") {
      setResolvedTheme(systemColorScheme === "dark" ? "dark" : "light");
    } else {
      setResolvedTheme(mode);
    }
  }, [mode, systemColorScheme, setResolvedTheme]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(main)/home" />
      <Stack.Screen name="(main)/settings" />
    </Stack>
  );
}
