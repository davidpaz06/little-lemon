import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FC, useEffect, useState } from "react";
import Form from "../components/Form";

interface ProfileProps {
  user: { [key: string]: string } | null;
  onLogout: () => void;
  onUserUpdate: (user: { [key: string]: string }) => void;
}

const Profile: FC<ProfileProps> = ({ user, onLogout, onUserUpdate }) => {
  const [formData, setFormData] = useState<{ [key: string]: string } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        user = JSON.parse(storedUserData);
        setFormData(user);
      }
      setIsLoading(false);
    };
    loadUserData();
  }, []);

  const handleFormSubmit = async (formData: { [key: string]: string }) => {
    await AsyncStorage.setItem("isOnboardingComplete", "true");
    await AsyncStorage.setItem("userData", JSON.stringify(formData));
    onUserUpdate(formData);
  };

  const formFields = formData
    ? [
        {
          name: "firstName",
          label: "First Name",
          placeholder: "Enter your name",
          value: user?.firstName,
          required: true,
        },

        {
          name: "lastName",
          label: "Last Name",
          placeholder: "Enter your last name",
          value: user?.lastName,
          required: true,
        },

        {
          name: "email",
          label: "Email",
          placeholder: "Enter your email",
          value: user?.email,
          keyboardType: "email-address" as const,
          autoCapitalize: "none" as const,
          required: true,
        },

        {
          name: "phoneNumber",
          label: "Phone Number",
          placeholder: "Enter your phone number",
          value: user?.phoneNumber,
          keyboardType: "phone-pad" as const,
          required: true,
        },
      ]
    : [];

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        formData && (
          <View>
            <Form
              fields={formFields}
              onSubmit={handleFormSubmit}
              containerStyle={styles.formContainer}
              labelStyle={styles.formLabel}
              inputStyle={styles.formInput}
              buttonStyle={styles.formButton}
              buttonTextStyle={styles.formButtonText}
            />
            <Pressable onPress={onLogout} style={styles.button}>
              <Text style={styles.buttonText}>Logout</Text>
            </Pressable>
          </View>
        )
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "black",
  },

  formContainer: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: "red",
    alignItems: "flex-start",
  },

  formLabel: {
    textAlign: "left",
  },
  formInput: {
    // width: 320,
  },
  formButton: {
    backgroundColor: "#495E57",
  },
  formButtonText: {
    color: "#fff",
  },

  text: {
    fontSize: 24,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#f4ce14",
    padding: 10,
    borderRadius: 5,
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Profile;
