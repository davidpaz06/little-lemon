import React, { FC, useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Props {
  label: string;
  isChecked: boolean;
  onToggle: (label: string, checked: boolean) => void;
}

const Checkbox: FC<Props> = ({ label, isChecked, onToggle }) => {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const toggleCheckbox = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onToggle(label, newChecked);
  };

  return (
    <Pressable onPress={toggleCheckbox} style={styles.container}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Icon name="check" size={20} color="#fff" />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#495E57",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: "#495E57",
  },
  label: {
    fontSize: 16,
  },
});

export default Checkbox;
