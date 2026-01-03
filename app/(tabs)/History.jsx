import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDateRangeToDisplay } from "../../service/ConvertDateTime";
import { useRouter } from "expo-router";
import MedicationCardItem from "../../components/MedicationCardItem";
import { getLocalStorage } from "../../service/Storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

const History = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [medList, setMedList] = useState([]);
  const [initialDateSet, setInitialDateSet] = useState(false);

  const GetDateList = () => {
    const dates = getDateRangeToDisplay();
    setDateRange(dates);

    // Set default selected date to today or first date if not set
    if (!selectedDate && dates.length > 0) {
      // Find today's date or use the first date
      const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
      const todayInList = dates.find((date) => date.formattedDate === today);
      if (todayInList) {
        setSelectedDate(today);
      } else {
        setSelectedDate(dates[0]?.formattedDate);
      }
    }
  };

  const GetMedicationList = async (date) => {
    if (!date) {
      setMedList([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const user = await getLocalStorage("userDetail");

      if (!user?.email) {
        setMedList([]);
        setLoading(false);
        return;
      }
      const q = query(
        collection(db, "medication"),
        where("userEmail", "==", user.email),
        where("dateRange", "array-contains", date)
      );

      const querySnapshot = await getDocs(q);
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMedList(list);
    } catch (error) {
      console.log("Error fetching medications:", error);
      setMedList([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await GetMedicationList(selectedDate);
  };

  // Handle date change
  const handleDatePress = (formattedDate) => {
    setSelectedDate(formattedDate);
    GetMedicationList(formattedDate);
  };

  useEffect(() => {
    GetDateList();
  }, []);

  // Fetch medications when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      GetMedicationList(selectedDate);
    }
  }, [selectedDate]);

  return (
    <FlatList
      data={[]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={
        <View style={styles.mainCont}>
          <Image
            style={styles.imageB}
            source={require("./../../assets/images/Medication/history.jpg")}
          />
          <Text style={styles.text}>Medication History</Text>

          {/* Dates List */}
          <FlatList
            data={dateRange}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.formattedDate}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleDatePress(item.formattedDate)}
                style={[
                  styles.dateGroup,
                  {
                    backgroundColor:
                      item?.formattedDate === selectedDate
                        ? "rgba(29, 102, 113, 0.87)"
                        : "rgba(177, 240, 250, 0.87)",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.day,
                    {
                      color:
                        item?.formattedDate === selectedDate ? "#fff" : "#000",
                    },
                  ]}
                >
                  {item.day}
                </Text>
                <Text
                  style={[
                    styles.date,
                    {
                      color:
                        item?.formattedDate === selectedDate ? "#fff" : "#000",
                    },
                  ]}
                >
                  {item.date}
                </Text>
              </TouchableOpacity>
            )}
          />

          {/* Medications List */}
          <View style={styles.medicationListContainer}>
            {loading ? (
              <Text style={styles.loadingText}>Loading medications...</Text>
            ) : medList.length > 0 ? (
              <FlatList
                data={medList}
                keyExtractor={(item) => item.id}
                scrollEnabled={false} // Since it's inside another FlatList
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/action-modal",
                        params: {
                          ...item,
                          selectedDate: selectedDate,
                        },
                      })
                    }
                    style={styles.medicationItem}
                  >
                    <MedicationCardItem
                      medicine={item}
                      selectedDate={selectedDate}
                    />
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.noMed}>
                  {selectedDate
                    ? "No medications for this date"
                    : "Select a date to view medications"}
                </Text>
              </View>
            )}
          </View>
        </View>
      }
      ListEmptyComponent={null}
    />
  );
};

export default History;

const styles = StyleSheet.create({
  mainCont: {
    padding: 24,
    backgroundColor: "white",
    minHeight: "100%",
  },
  dateGroup: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: "rgba(177, 240, 250, 0.87)",
    alignItems: "center",
    marginRight: 5,
    marginTop: 14,
    borderRadius: 5,
    minWidth: 70,
  },
  day: {
    fontSize: 17,
    fontWeight: "bold",
  },
  imageB: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },
  medicationListContainer: {
    marginTop: 20,
  },
  medicationItem: {
    marginBottom: 10,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#666",
  },
  noMed: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    paddingVertical: 40,
  },
});
