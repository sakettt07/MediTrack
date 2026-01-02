import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../service/Storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

const Header = () => {
  const router = useRouter();
  const [userInfoData, setUserInfoData] = useState(null);

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("userDetail");
    setUserInfoData(userInfo);
  };

  useEffect(() => {
    GetUserDetail();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View>
          <Text style={styles.greeting}>Welcome 👋</Text>
          <Text style={styles.name}>{userInfoData?.displayName}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/add-new-medication")}>
          <Ionicons name="medkit-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 14,
    color: "#4a4a4a",
    opacity: 0.8,
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    marginTop: 2,
  },
});
