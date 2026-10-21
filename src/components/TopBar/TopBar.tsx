import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ITheme } from "../../constants/interfaces";
import { useThemedStyles } from "../../hooks/useThemedStyles";

type TopBarProps = {
  onMenuPress: () => void;
};

const TopBar: FC<TopBarProps> = ({ onMenuPress }) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress}>
        <MaterialIcons name="menu" size={32} color={styles.iconColor} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Feather name="plus-circle" size={32} color={styles.iconColor} />
      </TouchableOpacity>
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: 50,
      backgroundColor: "transparent",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
    },
    iconColor: {
      color: theme.colors.text,
    },
  });

export default TopBar;
