import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs, Tab, useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { getLocalStorage } from "../../service/Storage";

export default function TabLayout() {
  const router = useRouter();

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("userDetail");
    if (!userInfo) {
      router.replace("/login");
    }
  };
  useEffect(() => {
    GetUserDetail();
  });
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="AddNew"
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="add" size={size} color={color} />
          ),
        }}
      ></Tabs.Screen>
      {/* <FontAwesome6 name="user-doctor" size={24} color="black" /> */}
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user-doctor" size={size} color={color} />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
