import Chat from "@/components/Chat/Chat";
import SideBar from "@/components/SideBar/SideBar";
import Wrapper from "@/components/Wrapper/Wrapper";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpenAnimationComplete, setIsOpenAnimationComplete] = useState(false);
  const drawerProgress = useSharedValue(0);
  const sidebarWidth = width * 0.8;

  useEffect(() => {
    drawerProgress.value = withTiming(
      isSidebarOpen ? 1 : 0,
      {
        duration: 280,
      },
      (finished) => {
        if (finished) {
          scheduleOnRN(setIsOpenAnimationComplete, isSidebarOpen);
        }
      },
    );
  }, [drawerProgress, isSidebarOpen, setIsOpenAnimationComplete]);

  const toggleSidebar = () => {
    setIsOpenAnimationComplete(false);
    setIsSidebarOpen((isOpen) => !isOpen);
  };

  const sidebarStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          drawerProgress.value,
          [0, 1],
          [-sidebarWidth, 0],
        ),
      },
    ],
  }));

  const chatStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      drawerProgress.value,
      [0, 1],
      [theme.colors.background, theme.colors.backgroundElement],
    ),
    transform: [
      {
        translateX: interpolate(
          drawerProgress.value,
          [0, 1],
          [0, sidebarWidth],
        ),
      },
      {
        scaleY: interpolate(drawerProgress.value, [0, 1], [1, 0.96]),
      },
    ],
  }));

  return (
    <Wrapper>
      <View style={styles.container}>
        <Animated.View
          pointerEvents={isSidebarOpen ? "box-none" : "none"}
          style={[styles.sidebar, sidebarStyle]}
        >
          <SideBar />
        </Animated.View>
        <Animated.View style={[styles.chat, chatStyle]}>
          <Chat onMenuPress={toggleSidebar} />
          {isSidebarOpen && isOpenAnimationComplete && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close menu"
              onPress={toggleSidebar}
              style={StyleSheet.absoluteFill}
            />
          )}
        </Animated.View>
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  sidebar: {
    ...StyleSheet.absoluteFill,
  },
  chat: {
    flex: 1,
    borderRadius: 16,
  },
});
