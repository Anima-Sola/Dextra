import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { ReactNode } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type WrapperProps = {
  children: ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
  const styles = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();
  const statusBarHeight =
    Platform.OS === "ios" ? insets.top : StatusBar.currentHeight;

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider style={styles.container}>
        <View style={{ ...styles.statusBar, height: statusBarHeight }} />
        {children}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    statusBar: {
      backgroundColor: theme.colors.background,
    },
  });
