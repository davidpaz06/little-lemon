import { StyleSheet, View, Image, SafeAreaView } from "react-native";
import { FC } from "react";

const Header: FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Logo.png")}
        style={styles.logo}
      />
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

  logo: {
    width: "75%",
    height: 50,
    resizeMode: "contain",
  },
});

export default Header;
