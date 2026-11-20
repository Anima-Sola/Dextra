import fontSizes from "@/constants/fontSizes";
import { ITheme } from "@/constants/interfaces";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useUserStore } from "@/store/userStore";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function ProfileCard() {
  const styles = useThemedStyles(createStyles);
  const { name, avatar, email } = useUserStore();

  return (
    <TouchableOpacity style={styles.profileCard} activeOpacity={0.8}>
      <View style={styles.avatar}>
        <Image source={avatar} style={styles.avatarImage} />
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={styles.iconColor.color}
      />
    </TouchableOpacity>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    profileCard: {
      height: 78,
      marginTop: 1,
      marginBottom: 27,
      paddingHorizontal: 15,
      borderRadius: 25,
      backgroundColor: theme.colors1.secondaryBackground,
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      borderRadius: 28,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarImage: {
      width: 60,
      height: 60,
    },
    profileContainer: {
      flex: 1,
      marginLeft: 10,
    },
    profileName: {
      color: theme.colors1.mainText,
      fontSize: fontSizes.FONT15,
      fontWeight: "600",
      marginBottom: 2,
    },
    profileEmail: {
      color: theme.colors1.secondaryText,
      fontSize: fontSizes.FONT12,
      fontFamily: "ComfortaaBold",
    },
    iconColor: {
      color: theme.colors.text,
    },
  });
