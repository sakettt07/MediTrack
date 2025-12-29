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
import { TypeList, WhenToTake } from "../constants/Options";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { formatDate, formatDateForText } from "../service/ConvertDateTime";

const MedicationForm = () => {
  const [formData, setFormData] = useState();
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
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
          marginTop: 6,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onHandleInputChange("type", item)}
            style={[
              styles.inputGroup,
              { marginRight: 3 },
              {
                backgroundColor:
                  item.name == formData?.type?.name
                    ? "rgba(156, 241, 249, 0.87)"
                    : "transparent",
              },
            ]}
          >
            <Text style={styles.typeText}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="eyedrop-outline"
          size={24}
          color="black"
        />
        <TextInput
          onChangeText={(value) => onHandleInputChange("dose", value)}
          style={styles.textInput}
          placeholder="Enter dost"
        />
      </View>

      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="time-outline"
          size={24}
          color="black"
        />
        <Picker
          selectedValue={formData?.value}
          onValueChange={(itemValue, itemindex) =>
            onHandleInputChange("when", itemValue)
          }
          style={{
            width: "90%",
          }}
        >
          {WhenToTake.map((item, index) => (
            <Picker.Item label={item} value={item} />
          ))}
        </Picker>
      </View>

      <View style={styles.dateInputGroup}>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <TouchableOpacity
            onPress={() => setShowStartDate(true)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons style={styles.icon} name="calendar-outline" size={24} />
            <Text style={styles.text}>
              {formData?.startDate
                ? formatDateForText(formData.startDate)
                : "Start Date"}
            </Text>
          </TouchableOpacity>
          {showStartDate && (
            <RNDateTimePicker
              minimumDate={new Date()}
              onChange={(e, selectedDate) => {
                setShowStartDate(false);
                if (e.type === "set") {
                  onHandleInputChange("startDate", formatDate(selectedDate));
                }
              }}
              value={
                formData?.startDate ? new Date(formData?.startDate) : new Date()
              }
            />
          )}
        </View>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <TouchableOpacity
            onPress={() => setShowEndDate(true)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons style={styles.icon} name="calendar-outline" size={24} />
            <Text style={styles.text}>
              {formData?.endDate
                ? formatDateForText(formData?.endDate)
                : "End Date"}
            </Text>
          </TouchableOpacity>
          {showEndDate && (
            <RNDateTimePicker
              minimumDate={new Date()}
              onChange={(e, selectedDate) => {
                setShowEndDate(false);
                if (e.type === "set") {
                  onHandleInputChange("endDate", formatDate(selectedDate));
                }
              }}
              value={
                formData?.endDate ? new Date(formData?.endDate) : new Date()
              }
            />
          )}
        </View>
      </View>
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
    marginTop: 10,
  },
  dateInputGroup: {
    flexDirection: "row",
    gap: 10,
    marginTop: 7,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  text: {
    fontSize: 13,
    marginLeft: 5,
  },
  typeText: {
    fontSize: 13,
    fontWeight: 600,
  },
  icon: {
    color: "#7fa8eaff",
    borderRightWidth: 1,
    paddingRight: 12,
    borderColor: "rgba(179, 179, 176, 0.93)",
  },
});
