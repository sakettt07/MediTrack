import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const MedicationHeader = () => {
  return (
    <View>
      <Image
        style={styles.headImg}
        source={require("./../assets/images/Medication/header.jpg")}
      />
    </View>
  );
};

export default MedicationHeader;
const styles = StyleSheet.create({
  headImg: {
    width: "100%",
    height: "200px",
  },
});
