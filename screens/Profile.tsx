import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FC, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Form from "../components/Form";
import Checkbox from "../components/Checkbox";

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
  const [image, setImage] = useState<string | null>(null);
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({
    "Order statuses": false,
    "Password changes": false,
    "Special offers": false,
    Newsletter: false,
  });

  useEffect(() => {
    const loadUserData = async () => {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        user = JSON.parse(storedUserData);
        setFormData(user);
        if (user?.image) {
          setImage(user.image);
        }
      }
      const storedCheckboxes = await AsyncStorage.getItem("checkboxes");
      if (storedCheckboxes) {
        setCheckboxes(JSON.parse(storedCheckboxes));
      }
      setIsLoading(false);
    };
    loadUserData();
  }, []);

  useEffect(() => {
    console.log("data", formData);
  }, [formData]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
      if (formData) {
        const updatedFormData = { ...formData, image: imageUri };
        setFormData(updatedFormData);
        await AsyncStorage.setItem("userData", JSON.stringify(updatedFormData));
      }
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleFormSubmit = async (formData: { [key: string]: string }) => {
    await AsyncStorage.setItem("isOnboardingComplete", "true");
    await AsyncStorage.setItem("userData", JSON.stringify(formData));
    onUserUpdate(formData);
  };

  const handleCheckboxToggle = (label: string, checked: boolean) => {
    const updatedCheckboxes = { ...checkboxes, [label]: checked };
    setCheckboxes(updatedCheckboxes);
    AsyncStorage.setItem("checkboxes", JSON.stringify(updatedCheckboxes));
  };

  const formFields = formData
    ? [
        {
          name: "firstName",
          label: "First Name",
          placeholder: "Enter your name",
          value: formData?.firstName,
          required: true,
        },
        {
          name: "lastName",
          label: "Last Name",
          placeholder: "Enter your last name",
          value: formData.lastName,
          required: true,
        },
        {
          name: "email",
          label: "Email",
          placeholder: "Enter your email",
          value: formData.email,
          keyboardType: "email-address" as const,
          autoCapitalize: "none" as const,
          required: true,
        },
        {
          name: "phoneNumber",
          label: "Phone Number",
          placeholder: "Enter your phone number",
          value: formData.phoneNumber,
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
          <ScrollView>
            <View style={styles.subHeading}>
              <Text style={styles.subHeadingTitle}>Personal information</Text>

              {image && (
                <View style={styles.imageContainer}>
                  <Text>Avatar</Text>
                  <Image source={{ uri: image }} style={styles.image} />
                </View>
              )}

              <View style={styles.subHeadingBody}>
                <Pressable style={styles.buttonOne} onPress={pickImage}>
                  <Text style={styles.buttonTextOne}>Change</Text>
                </Pressable>

                <Pressable style={styles.buttonTwo} onPress={removeImage}>
                  <Text style={styles.buttonTextTwo}>Remove</Text>
                </Pressable>
              </View>
            </View>
            <Form
              fields={formFields}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleFormSubmit}
              containerStyle={styles.formContainer}
              labelStyle={styles.formLabel}
              inputStyle={styles.formInput}
              buttonStyle={styles.formButton}
              buttonTextStyle={styles.formButtonText}
            />

            <View style={styles.subHeading}>
              <Text style={styles.subHeadingTitle}>Email notifications</Text>
              <Checkbox
                label="Order statuses"
                isChecked={checkboxes["Order statuses"]}
                onToggle={handleCheckboxToggle}
              />
              <Checkbox
                label="Password changes"
                isChecked={checkboxes["Password changes"]}
                onToggle={handleCheckboxToggle}
              />
              <Checkbox
                label="Special offers"
                isChecked={checkboxes["Special offers"]}
                onToggle={handleCheckboxToggle}
              />
              <Checkbox
                label="Newsletter"
                isChecked={checkboxes["Newsletter"]}
                onToggle={handleCheckboxToggle}
              />
            </View>

            <Pressable onPress={onLogout} style={styles.logoutButton}>
              <Text style={styles.buttonText}>Logout</Text>
            </Pressable>
          </ScrollView>
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
    borderColor: "silver",
    borderRadius: 5,
    margin: 1,
  },

  subHeading: {
    alignSelf: "flex-start",
    padding: 16,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },

  subHeadingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },

  subHeadingBody: {
    fontSize: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  image: {
    marginVertical: 8,
    width: 150,
    height: 150,
    borderRadius: 75,
  },

  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonOne: {
    backgroundColor: "#495E57",
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginVertical: 16,
    borderRadius: 5,
    alignSelf: "center",
  },

  buttonTextOne: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },

  buttonTwo: {
    backgroundColor: "#edefee",
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginVertical: 16,
    alignSelf: "center",
  },

  buttonTextTwo: {
    color: "#495E57",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },

  formContainer: {
    flex: 1,
    alignSelf: "stretch",
    width: "100%",
    alignItems: "flex-start",
  },

  formLabel: {
    textAlign: "left",
  },
  formInput: {
    width: 328,
  },
  formButton: {
    backgroundColor: "#495E57",
    alignSelf: "flex-start",
  },
  formButtonText: {
    color: "#fff",
  },

  text: {
    fontSize: 20,
    textAlign: "left",
  },

  logoutButton: {
    backgroundColor: "#f4ce14",
    paddingVertical: 8,
    paddingHorizontal: 100,
    marginVertical: 16,
    borderRadius: 5,
    alignSelf: "center",
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Profile;
