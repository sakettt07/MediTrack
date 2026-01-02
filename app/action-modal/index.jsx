import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import MedicationCardItem from "../../components/MedicationCardItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import moment from "moment";

const MedicineActionModal = ({}) => {
  const router = useRouter();
  const medicine = useLocalSearchParams();

  const UpdateActionStatus = async (status) => {
    try {
      const docRef = doc(db, "medication", medicine?.docId);
      await updateDoc(docRef, {
        action: arrayUnion({
          status: status,
          time: moment().format("LT"),
          date: medicine?.selectedDate,
        }),
      });
      Alert.alert(status, "Response Saved!", [
        {
          text: "Ok",
          onPress: () => router.replace("(tabs)"),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.notiImage}
        source={require("./../../assets/images/EmptyState/noti.gif")}
      />
      <Text
        style={{
          fontSize: 18,
        }}
      >
        {medicine?.selectedDate}
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        {medicine?.reminder}
      </Text>
      <Text>It's time to take</Text>
      <MedicationCardItem medicine={medicine} />
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => UpdateActionStatus("Missed")}
          style={styles.closeBtn}
        >
          <Ionicons name="close-outline" size={24} color="#d32424ff" />
          <Text
            style={{
              fontSize: 18,
              color: "#d32424ff",
            }}
          >
            Missed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => UpdateActionStatus("Taken")}
          style={styles.successBtn}
        >
          <Ionicons name="checkmark-outline" size={24} color="#48a41dff" />
          <Text
            style={{
              fontSize: 18,
              color: "#48a41dff",
            }}
          >
            Taken
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: "absolute",
          bottom: 60,
        }}
      >
        <Ionicons name="close-circle" size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default MedicineActionModal;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#fff",
  },
  notiImage: {
    width: 150,
    height: 150,
  },
  btnContainer: {
    flexDirection: "row",
    marginTop: 25,
    gap: 6,
  },
  closeBtn: {
    padding: 10,
    flexDirection: "row",
    gap: 6,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "red",
    borderRadius: 10,
  },
  successBtn: {
    padding: 10,
    flexDirection: "row",
    gap: 6,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "green",
    borderRadius: 10,
  },
});
