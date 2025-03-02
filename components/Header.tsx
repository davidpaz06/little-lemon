import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  title?: string;
  logo?: boolean;
  showBackButton?: boolean;
  onBackPress?: () => void;
  backgroundColor?: string;
}

const Header: FC<HeaderProps> = ({
  title,
  logo,
  showBackButton,
  onBackPress,
  backgroundColor,
}) => {
  const navigation = useNavigation();
  const isLightBackground = "#fff";

  return (
    <View>
      <StatusBar
        backgroundColor={backgroundColor || "silver"}
        barStyle={isLightBackground ? "dark-content" : "light-content"}
      />
      <View
        style={[
          styles.container,
          { backgroundColor: backgroundColor || "silver" },
        ]}
      >
        {showBackButton && (
          <TouchableOpacity
            onPress={onBackPress || (() => navigation.goBack())}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        {title && <Text style={styles.title}>{title}</Text>}
        {logo && (
          <Image
            source={require("../assets/images/Logo.png")}
            style={styles.logo}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "silver",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  backButton: {
    position: "absolute",
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#495E57",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },

  logo: {
    width: "75%",
    height: 50,
    resizeMode: "contain",
  },
});

export default Header;
