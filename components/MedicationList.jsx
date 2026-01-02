import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDateRangeToDisplay } from "../service/ConvertDateTime";
import moment from "moment";
import { getLocalStorage } from "../service/Storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import MedicationCardItem from "./MedicationCardItem";
import EmptyState from "./EmptyState";
import { useRouter } from "expo-router";

const MedicationList = () => {
  const router = useRouter();
  const [medList, setMedList] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const GetDateRangeList = () => {
    const dateRange = getDateRangeToDisplay();
    setDateRange(dateRange);
    if (dateRange?.length > 0) {
      setSelectedDate(dateRange[0]);
    }
  };
  const GetMedicationList = async (selectedDate) => {
    setLoading(true);
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

      setMedList(list);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    GetDateRangeList();
  }, []);
  useEffect(() => {
    GetMedicationList(selectedDate);
  }, [selectedDate]);
  return (
    <View
      style={{
        marginTop: 10,
        paddingRight: 9,
        paddingLeft: 9,
      }}
    >
      <Image
        style={styles.medListImage}
        source={require("./../assets/images/Medication/medicationList.jpg")}
      />
      <FlatList
        data={dateRange}
        horizontal
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setSelectedDate(item.formattedDate)}
            style={[
              styles.dateGroup,
              {
                backgroundColor:
                  item?.formattedDate == selectedDate
                    ? "rgba(29, 102, 113, 0.87)"
                    : "rgba(177, 240, 250, 0.87)",
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
      {medList.length > 0 ? (
        <FlatList
          data={medList}
          onRefresh={() => GetMedicationList(selectedDate)}
          refreshing={loading}
          keyExtractor={(item) => item.id}
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
            >
              <MedicationCardItem medicine={item} selectedDate={selectedDate} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noMed}>No medications...</Text>
      )}
    </View>
  );
};

export default MedicationList;
const styles = StyleSheet.create({
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
  },
  day: {
    fontSize: 17,
    fontWeight: "bold",
  },
  noMed: {
    textAlign: "center",
    marginTop: 30,
  },
});
