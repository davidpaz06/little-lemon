import { FC, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "./screens/Onboarding";
import Home from "./screens/Home";
import Header from "./components/Header";
import Profile from "./screens/Profile";

export interface RootStackParamList {
  Home: undefined;
  Profile: undefined;
  [key: string]: undefined;
}

const Stack = createStackNavigator<RootStackParamList>();

const App: FC = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [userData, setUserData] = useState<{ [key: string]: string } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const onboardingStatus = await AsyncStorage.getItem(
        "isOnboardingComplete"
      );
      const storedUserData = await AsyncStorage.getItem("userData");
      if (onboardingStatus === "true" && storedUserData) {
        setIsOnboardingComplete(true);
        setUserData(JSON.parse(storedUserData));
      }
      setIsLoading(false);
    };
    checkOnboardingStatus();
  }, []);

  const handleOnboardingComplete = async () => {
    setIsLoading(true);
    const storedUserData = await AsyncStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    setIsOnboardingComplete(true);
    console.log("data", userData);
    setIsLoading(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await AsyncStorage.removeItem("isOnboardingComplete");
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.removeItem("checkboxes");
    setIsOnboardingComplete(false);
    setUserData(null);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="transparent" />
        {isOnboardingComplete ? (
          <Stack.Navigator>
            <Stack.Screen name="Home">
              {(props) => <Home {...props} user={userData} />}
            </Stack.Screen>
            <Stack.Screen
              name="Profile"
              options={{
                header: () => (
                  <Header
                    logo={true}
                    showBackButton={true}
                    backgroundColor="#fff"
                  />
                ),
              }}
            >
              {(props) => (
                <Profile
                  {...props}
                  user={userData}
                  onLogout={handleLogout}
                  onUserUpdate={handleOnboardingComplete}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "silver",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
