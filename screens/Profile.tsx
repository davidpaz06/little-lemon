import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { FC } from "react";

interface ProfileProps {
  user: { [key: string]: string } | null;
}

const Profile: FC<ProfileProps> = ({ user }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome to the Profile Screen!</Text>
      {user && (
        <View>
          <Text>Name: {user.firstName}</Text>
          <Text>Email: {user.email}</Text>
        </View>
      )}
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

export default Profile;
