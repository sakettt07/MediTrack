import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

const MedicationHeader = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Medication/header.jpg")}
        style={styles.headImg}
        resizeMode="cover"
      />
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default MedicationHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },
  headImg: {
    width: "100%",
    height: 200,
  },
  backBtn: {
    position: "absolute",
    paddingTop: 40,
    paddingLeft: 10,
  },
});
