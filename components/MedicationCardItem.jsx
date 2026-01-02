import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const MedicationCardItem = ({ medicine, selectedDate }) => {
  const [status, setStatus] = useState(null);

  const checkStatus = () => {
    // Check if medicine.action exists and is an array
    if (!medicine?.action || !Array.isArray(medicine.action)) {
      setStatus(null);
      return;
    }

    const data = medicine.action.find((item) => item.date === selectedDate);
    setStatus(data);
  };

  useEffect(() => {
    checkStatus();
  }, [medicine, selectedDate]);

  // Get status color based on status
  const getStatusColor = () => {
    if (!status?.status) return "#757575"; // Grey for pending

    const statusColors = {
      Taken: "#2E7D32", // Green
      Missed: "#C62828", // Red
      Skipped: "#EF6C00", // Orange
    };

    return statusColors[status.status] || "#757575";
  };

  // Get status icon
  const getStatusIcon = () => {
    if (!status?.status) return "time-outline";

    const statusIcons = {
      Taken: "checkmark-circle",
      Missed: "close-circle",
      Skipped: "remove-circle",
    };

    return statusIcons[status.status] || "time-outline";
  };

  return (
    <View style={styles.card}>
      {/* Left side: Medicine info */}
      <View style={styles.leftSection}>
        {/* Medicine image or icon */}
        <View style={styles.imageContainer}>
          {medicine?.type?.icon ? (
            <Image
              source={{ uri: medicine.type.icon }}
              style={styles.medicineImage}
            />
          ) : (
            <Ionicons name="medical" size={28} color="#4A6572" />
          )}
        </View>

        {/* Medicine details */}
        <View style={styles.details}>
          <Text style={styles.name} numberOfLines={1}>
            {medicine?.name || "Medicine"}
          </Text>

          <View style={styles.row}>
            <Ionicons name="flask" size={14} color="#666" />
            <Text style={styles.dose}>
              {medicine?.dose || "0"} {medicine?.type?.name || ""}
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="time" size={14} color="#666" />
            <Text style={styles.timeText}>{medicine?.when || ""}</Text>
          </View>
        </View>
      </View>

      {/* Right side: Status and reminder */}
      <View style={styles.rightSection}>
        {/* Reminder time */}
        <View style={styles.reminderRow}>
          <Ionicons name="alarm" size={18} color="#5D3FD3" />
          <Text style={styles.reminder}>{medicine?.reminder || ""}</Text>
        </View>

        {/* Status indicator */}
        <View
          style={[
            styles.statusContainer,
            { backgroundColor: getStatusColor() + "20" },
          ]}
        >
          <Ionicons name={getStatusIcon()} size={16} color={getStatusColor()} />
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {status?.status || "Pending"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MedicationCardItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#F5F7FA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  medicineImage: {
    width: 32,
    height: 32,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#263238",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  dose: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
  timeText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
  rightSection: {
    alignItems: "flex-end",
    marginLeft: 10,
  },
  reminderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reminder: {
    fontSize: 14,
    color: "#5D3FD3",
    fontWeight: "500",
    marginLeft: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
});
