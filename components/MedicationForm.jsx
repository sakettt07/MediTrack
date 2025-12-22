import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TypeList } from "../constants/Options";

const MedicationForm = () => {
  const [formData, setFormData] = useState();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text style={styles.header}>Add New Medication</Text>
      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="medkit-outline"
          size={24}
          color="black"
        />
        <TextInput
          onChangeText={(value) => onHandleInputChange("name", value)}
          style={styles.textInput}
          placeholder="Medicine Name"
        />
      </View>
      {/* Type List */}
      <FlatList
        data={TypeList}
        horizontal
        style={{
          marginTop: 20,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onHandleInputChange("type", item)}
            style={[styles.inputGroup, { marginRight: 3 }]}
          >
            <Text style={styles.typeText}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Text>Okkkjk</Text>
    </View>
  );
};

export default MedicationForm;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 700,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d6d4d4ff",
    marginTop: 7,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  typeText: {
    fontSize: 13,
  },
  icon: {
    color: "#7fa8eaff",
    borderRightWidth: 1,
    paddingRight: 12,
    borderColor: "rgba(179, 179, 176, 0.93)",
  },
});
