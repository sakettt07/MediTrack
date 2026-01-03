import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Redirect, useRouter } from "expo-router";
import Header from "../../components/Header";
import MedicationList from "../../components/MedicationList";

export default function Home() {
  return (
    <View
      style={{
        backgroundColor: "#e0eff6",
        height: "100%",
      }}
    >
      <Header />
      <MedicationList />
    </View>
  );
}
const styles = StyleSheet.create({
  logoutt: {
    marginTop: 9,
    backgroundColor: "#fff",
    padding: 5,
    textAlign: "center",
  },
});
