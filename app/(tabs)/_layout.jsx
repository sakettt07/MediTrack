import { View, Text } from 'react-native'
import React from 'react';
import {Tabs,Tab} from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown:false
    }}>
        <Tabs.Screen name='index' options={{
            tabBarLabel:'Home',
            tabBarIcon:({color,size})=>(
                <FontAwesome5 name="home" size={size} color={color} />
            )
        }}></Tabs.Screen>
        <Tabs.Screen name='AddNew' options={{
            tabBarLabel:'Add',
            tabBarIcon:({color,size})=>(
                <FontAwesome6 name="add" size={size} color={color} />
            )
        }}></Tabs.Screen>
        {/* <FontAwesome6 name="user-doctor" size={24} color="black" /> */}
        <Tabs.Screen name='Profile' options={{
            tabBarLabel:'Profile',
            tabBarIcon:({color,size})=>(
                <FontAwesome6 name="user-doctor" size={size} color={color} />
            )
        }}></Tabs.Screen>
    </Tabs>
  )
}