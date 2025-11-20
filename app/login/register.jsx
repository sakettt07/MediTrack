import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { auth } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setLocalStorage } from "../../service/Storage";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if(!name ||!email ||!password){
      ToastAndroid.show("Please fill all the fields",ToastAndroid.TOP);
      return ;
    }
    // handle register logic here
    createUserWithEmailAndPassword(auth,email,password).then(async(userCredential)=>{
      const user=userCredential.user;
      await updateProfile(user,{
        displayName:name
      })
      setLocalStorage('userDetail',user)
      router.push('(tabs)')
    }).catch((error)=>{
      const errorCode=error.code;
      const errorMessage=error.message;
      if(errorCode==='auth/email-already-in-use'){
        ToastAndroid.show("Email already exist ",ToastAndroid.TOP)
      }
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <LinearGradient
        colors={["#fffafc", "#fff6f8"]}
        style={styles.wrapper}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.title}>Let’s Sign You In ✨</Text>
        <Text style={styles.subtitle}>Create your account to get started</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#777"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#777"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#777"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleRegister}
            style={styles.buttonWrap}
          >
            <LinearGradient
              colors={["#ff6b6b", "#ff4e50"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Register</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("login/login")}
            style={styles.link}
          >
            <Text style={styles.linkText}>
              Already have an account? <Text style={styles.highlight}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fffafc",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#da3b32",
    marginBottom: 6,
  },
  subtitle: {
    color: "#5a5a5a",
    fontSize: 14,
    marginBottom: 28,
    textAlign: "center",
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    fontSize: 15,
    color: "#333",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  buttonWrap: {
    width: "100%",
    marginTop: 6,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    paddingVertical: 14,
    gap: 8,
    elevation: 6,
    shadowColor: "#ff6b6b",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: "#5a5a5a",
    fontSize: 14,
  },
  highlight: {
    color: "#da3b32",
    fontWeight: "700",
  },
});
