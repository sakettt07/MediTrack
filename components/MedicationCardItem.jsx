import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const MedicationCardItem = ({ medicine }) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.imageCont}>
          <Image
            source={{ uri: medicine?.type?.icon }}
            style={{
              width: 80,
              height: 80,
            }}
          />
        </View>
        <View>
          <Text style={styles.medName}>{medicine?.name}</Text>
          <Text style={styles.medWhen}>{medicine?.when}</Text>
          <Text style={styles.medDose}>
            {medicine?.dose} {medicine?.type.name}
          </Text>
        </View>
      </View>
      <View style={styles.medTime}>
        <Ionicons name="timer-outline" size={24} color="black" />
        <Text style={{ fontWeight: "bold" }}>{medicine?.reminder}</Text>
      </View>
    </View>
  );
};

export default MedicationCardItem;

const styles = StyleSheet.create({
  container: {
    padding: 7,
    backgroundColor: "rgba(237, 182, 120, 0.87)",
    borderColor: "#000",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 19,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  imageCont: {
    // backgroundColor: "#fff",
    borderRadius: 15,
    marginRight: 10,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  medName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  medWhen: {
    fontSize: 15,
  },
  medDose: {
    color: "#fff",
    fontWeight: "bold",
  },
  medTime: {
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
});
