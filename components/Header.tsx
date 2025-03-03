import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
  Pressable,
} from "react-native";
import { FC, useEffect, useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HeaderProps {
  title?: string;
  logo?: boolean;
  showBackButton?: boolean;
  onBackPress?: () => void;
  onImagePress?: () => void;
  backgroundColor?: string;
}

const Header: FC<HeaderProps> = ({
  title,
  logo,
  showBackButton,
  onBackPress,
  onImagePress,
  backgroundColor,
}) => {
  const navigation = useNavigation();
  const isLightBackground = "#fff";
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    const loadUserImage = async () => {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const user = JSON.parse(storedUserData);
        if (user.image) {
          setUserImage(user.image);
        }
      }
    };
    loadUserImage();
  }, []);

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

        {userImage && (
          <Pressable
            style={styles.imageContainer}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image source={{ uri: userImage }} style={styles.avatar} />
          </Pressable>
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

  imageContainer: {
    position: "absolute",
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "silver",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;
