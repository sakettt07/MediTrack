import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { Redirect, useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

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
        padding: 12,
      }}
    >
      <Text style={{
        color:"#fff"
      }}>Home</Text>
      <Button style={styles.logoutt} title='logout' onPress={handleLogout}/>
    </View>
  );
}
const styles=StyleSheet.create({
  logoutt:{
    marginTop:9,
    backgroundColor:"#fff"
  }
})
