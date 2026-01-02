import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TypeList, WhenToTake } from "../constants/Options";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  formatDate,
  formatDateForText,
  formatTime,
  getDatesRange,
} from "../service/ConvertDateTime";
import { db } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getLocalStorage } from "../service/Storage";
import { useRouter } from "expo-router";

const MedicationForm = () => {
  const [formData, setFormData] = useState({});
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveMedication = async () => {
    const docId = Date.now().toString();
    const user = await getLocalStorage("userDetail");
    if (
      !formData?.name ||
      !formData?.type ||
      !formData?.dose ||
      !formData?.startDate ||
      !formData?.endDate ||
      !formData?.reminder
    ) {
      Alert.alert("Enter all felds");
      return;
    }
    const dates = getDatesRange(formData?.startDate, formData?.endDate);

    setLoader(true);

    try {
      await setDoc(doc(db, "medication", docId), {
        ...formData,
        userEmail: user?.email,
        docId: docId,
        dateRange: dates,
      });
      setLoader(false);
      Alert.alert("Great!", "New Medication added successfully!", [
        {
          text: "Ok",
          onPress: () => router.push("(tabs)"),
        },
      ]);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  return (
    <ScrollView
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
          placeholder="Enter dose"
        />
      </View>

      <View style={[styles.inputGroup, { paddingY: 0 }]}>
        <Ionicons
          style={styles.icon}
          name="time-outline"
          size={20}
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
      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          style={[styles.inputGroup, { flex: 1 }]}
        >
          <Ionicons style={styles.icon} name="timer-outline" size={24} />
          <Text style={styles.text}>
            {formData?.reminder ?? "Select Reminder Time"}
          </Text>
        </TouchableOpacity>
      </View>
      {showTimePicker && (
        <RNDateTimePicker
          mode="time"
          value={
            formData?.reminder
              ? (() => {
                  const [h, m] = formData.reminder.split(":");
                  const d = new Date();
                  d.setHours(h);
                  d.setMinutes(m);
                  d.setSeconds(0);
                  return d;
                })()
              : new Date()
          }
          onChange={(e, selectedTime) => {
            setShowTimePicker(false);

            if (e.type === "set" && selectedTime) {
              onHandleInputChange("reminder", formatTime(selectedTime));
            }
          }}
        />
      )}
      <TouchableOpacity onPress={saveMedication} style={styles.buttonStyle}>
        {loader ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <Text style={styles.buttonText}>Add New Medication</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MedicationForm;

const styles = StyleSheet.create({
  header: {
    fontSize: 17,
    fontWeight: 700,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
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
    fontSize: 12,
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
  buttonStyle: {
    padding: 15,
    backgroundColor: "rgba(112, 182, 223, 0.87)",
    borderRadius: 4,
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 700,
    textAlign: "center",
  },
});
