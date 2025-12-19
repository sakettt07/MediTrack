import { View, StyleSheet } from "react-native";
import React from "react";
import MedicationHeader from "../../components/MedicationHeader";
import MedicationForm from "../../components/MedicationForm";

const Index = () => {
  return (
    <View style={styles.main}>
      <MedicationHeader />
      <MedicationForm />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
