import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { FC, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import Form from "../components/Form";

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: FC<OnboardingProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<{ [key: string]: string } | null>(
    null
  );
  const handleFormSubmit = async (formData: { [key: string]: string }) => {
    console.log("Form Data:", formData);
    await AsyncStorage.setItem("isOnboardingComplete", "true");
    await AsyncStorage.setItem("userData", JSON.stringify(formData));
    onComplete();
  };

  const formFields = [
    {
      name: "firstName",
      label: "First Name",
      placeholder: "Enter your name",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      keyboardType: "email-address" as const,
      autoCapitalize: "none" as const,
      required: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.text}>Let us get to know you!</Text>
      <Form
        fields={formFields}
        formData={formData || {}}
        setFormData={setFormData}
        onSubmit={handleFormSubmit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    margin: 50,
  },
});

export default Onboarding;
