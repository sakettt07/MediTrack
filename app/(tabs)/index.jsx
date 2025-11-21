import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { Redirect, useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import Header from '../../components/Header';

export default function Home() {
  const router=useRouter();

  const handleLogout=async()=>{
    try {
      await signOut(auth);
      router.replace('/login')
    } catch (error) {
      console.log('Logout Error',error);
    }
  }
  return (
    <View
      style={{
        backgroundColor: '#be6e6eff',
        height: '100%',
        padding: 30,
      }}
    >
      <Header />
    </View>
  );
}
const styles=StyleSheet.create({
  logoutt:{
    marginTop:9,
    backgroundColor:"#fff"
  }
})
