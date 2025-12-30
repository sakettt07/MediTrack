import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import MedicationHeader from "../../components/MedicationHeader";
import MedicationForm from "../../components/MedicationForm";

const Index = () => {
  return (
    <ScrollView style={styles.main}>
      <MedicationHeader />
      <MedicationForm />
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
