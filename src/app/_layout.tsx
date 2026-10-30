import { useSettingsStore } from "@/store/settingsStore";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const { setResolvedTheme, mode } = useSettingsStore();
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);
  const systemColorScheme = useColorScheme();

  useEffect(() => {
    if (mode === "system") {
      setResolvedTheme(systemColorScheme === "dark" ? "dark" : "light");
    } else {
      setResolvedTheme(mode);
    }
  }, [mode, systemColorScheme, setResolvedTheme]);

  useEffect(() => {
    const prepare = async () => {
      await loadFonts();

      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    };

    prepare();
  }, []);

  const loadFonts = async () => {
    try {
      if (!isFontsLoaded) {
        await Font.loadAsync({
          ComfortaaBold: require("../../assets/fonts/Comfortaa-Bold.ttf"),
          ComfortaaMedium: require("../../assets/fonts/Comfortaa-Medium.ttf"),
          ComfortaaRegular: require("../../assets/fonts/Comfortaa-Regular.ttf"),
          ComfortaaSemiBold: require("../../assets/fonts/Comfortaa-SemiBold.ttf"),
          ComfortaaLight: require("../../assets/fonts/Comfortaa-Light.ttf"),
        });
        setIsFontsLoaded(true);
      }
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(main)/home" />
      <Stack.Screen name="(main)/settings" />
    </Stack>
  );
}
