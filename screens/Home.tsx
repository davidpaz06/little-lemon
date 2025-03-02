import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { FC } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;

interface HomeProps {
  user: { [key: string]: string } | null;
  onLogout: () => void;
}

const Home: FC<HomeProps> = ({ user, onLogout }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
      {user && (
        <View>
          <Text>Name: {user.firstName}</Text>
          <Text>Email: {user.email}</Text>
        </View>
      )}
      <Button title="Logout" onPress={onLogout} />
      <Button
        title="Profile"
        onPress={() => navigation.navigate("Profile")}
      ></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
});

export default Home;
