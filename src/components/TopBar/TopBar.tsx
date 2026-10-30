import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ITheme } from "../../constants/interfaces";
import { useThemedStyles } from "../../hooks/useThemedStyles";

type TopBarProps = {
  onMenuPress: () => void;
  onAddPress: () => void;
};

const TopBar: FC<TopBarProps> = ({ onMenuPress, onAddPress }) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress}>
        <SimpleLineIcons name="menu" size={26} color={styles.iconColor.color} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onAddPress}>
        <Feather name="plus-circle" size={32} color={styles.iconColor.color} />
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
      paddingHorizontal: 15,
    },
    iconColor: {
      color: theme.colors.text,
    },
  });

export default TopBar;
