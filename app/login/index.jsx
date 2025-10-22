import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function Login() {
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Image
          source={require("../../assets/loginImg/Intro.jpg")}
          style={styles?.image}
        />
      </View>
      <View style={{
        padding:25,
        backgroundColor:"#c6072add",
        height:'100%'
      }}>
        <Text
          style={{
            color: "white",
            marginTop: 23,
            fontSize: 28,
            textAlign: "center",
            fontWeight:'bold'
          }}
        >
          Stay on track, Stay healthy
        </Text>
        <Text
          style={{
            color: "white",
            marginTop: 23,
            fontSize: 14,
            textAlign: "center",
          }}
        >
          Track your meds, take control of your health.Stay consistent stay confident
        </Text>

        <TouchableOpacity>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 370,
    height: 240,
  },
});
