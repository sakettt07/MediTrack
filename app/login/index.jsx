import { View, Text, Image,StyleSheet } from 'react-native'
import React from 'react'

export default function Login() {
  return (
    <View style={{
      backgroundColor:"red",
      height:"100%"
    }}>
      <View style={{
        display:'flex',
        alignItems:'center',
        marginTop:80
      }}>
        <Image source={require("../../assets/loginImg/Intro.png")} style={styles?.image} />
      </View>
      <Text style={{
        color:"white",
        fontSize:"30px"
      }}>Stay on track , stay healthy</Text>
    </View>
  )
};

const styles=StyleSheet.create({
  image:{
    width:370,
    height:240
  }
})