import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDateRangeToDisplay } from "../service/ConvertDateTime";
import moment from "moment";
import { getLocalStorage } from "../service/Storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import MedicationCardItem from "./MedicationCardItem";

// Loader Component
const Loader = ({
  size = "large",
  color = "#1D6671",
  text = "Loading medications...",
}) => {
  return (
    <View style={loaderStyles.container}>
      <View style={loaderStyles.loaderBox}>
        <ActivityIndicator size={size} color={color} />
        <Text style={loaderStyles.text}>{text}</Text>
      </View>
    </View>
  );
};

const MedicationList = () => {
  const [medList, setMedList] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialLoaded, setHasInitialLoaded] = useState(false);

  const GetDateRangeList = () => {
    const dateRange = getDateRangeToDisplay();
    setDateRange(dateRange);
    if (dateRange?.length > 0) {
      setSelectedDate(dateRange[0]);
    }
  };

  const GetMedicationList = async (selectedDate) => {
    if (!selectedDate) return;

    setIsLoading(true);
    const user = await getLocalStorage("userDetail");

    try {
      const q = query(
        collection(db, "medication"),
        where("userEmail", "==", user?.email),
        where("dateRange", "array-contains", selectedDate)
      );
      const querySnapshot = await getDocs(q);
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Simulate a slight delay for better UX (optional)
      setTimeout(() => {
        setMedList(list);
        setIsLoading(false);
        if (!hasInitialLoaded) setHasInitialLoaded(true);
      }, 300);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDatePress = (date) => {
    setSelectedDate(date.formattedDate);
  };

  useEffect(() => {
    GetDateRangeList();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      GetMedicationList(selectedDate);
    }
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.medListImage}
        source={require("./../assets/images/Medication/medicationList.jpg")}
      />

      {/* Date Range Selector */}
      <FlatList
        data={dateRange}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleDatePress(item)}
            disabled={isLoading}
            style={[
              styles.dateGroup,
              {
                backgroundColor:
                  item?.formattedDate == selectedDate
                    ? "rgba(29, 102, 113, 0.87)"
                    : "rgba(177, 240, 250, 0.87)",
                opacity: isLoading ? 0.7 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.day,
                {
                  color: item?.formattedDate == selectedDate ? "#fff" : "#000",
                },
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                styles.date,
                {
                  color: item?.formattedDate == selectedDate ? "#fff" : "#000",
                },
              ]}
            >
              {item.date}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Loading State */}
      {isLoading ? (
        <Loader />
      ) : (
        /* Medication List or Empty State */
        <View style={styles.listContainer}>
          {medList.length > 0 ? (
            <FlatList
              data={medList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MedicationCardItem medicine={item} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
            />
          ) : hasInitialLoaded ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No medications scheduled for this day
              </Text>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default MedicationList;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingRight: 9,
    paddingLeft: 9,
    flex: 1,
  },
  medListImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
  dateGroup: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: "rgba(177, 240, 250, 0.87)",
    display: "flex",
    alignItems: "center",
    marginRight: 5,
    marginTop: 14,
    borderRadius: 5,
    minWidth: 60,
  },
  day: {
    fontSize: 17,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    marginTop: 2,
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
});

const loaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  loaderBox: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 200,
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    color: "#1D6671",
    fontWeight: "500",
  },
});
