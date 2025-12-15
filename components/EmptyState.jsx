import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import emptyStateImg from "../assets/images/EmptyState/empty.jpg";

const EmptyState = ({
  title = "No Medications",
  message = "You have 0 medications setup",
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Image source={emptyStateImg} style={styles.image} resizeMode="contain" />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>+ Add new medication</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
});
