import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react';
import {Tabs,Tab, useRouter} from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';


export default function TabLayout() {
    const router=useRouter();
    const  [authenticated,setAuthenticated]=useState(null);

    // if user is logged in
    onAuthStateChanged(auth,(user)=>{
        if(user){
            const uid=user.uid;
            setAuthenticated(true);
        }
        else{
            setAuthenticated(false);
        }
    })
    useEffect(()=>{
        if(authenticated==false){
            router?.push('/login/login');
        }
    },[authenticated])
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