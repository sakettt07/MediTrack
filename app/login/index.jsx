import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
// optional icon - install if you want the arrow on button:
// npx expo install @expo/vector-icons
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Login({ navigation }) {

  const router=useRouter();
  const handleContinue = () => {
    if (navigation?.navigate) navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <LinearGradient
        // gentle off-white -> very pale pink for entire screen
        colors={["#fffafc", "#fff6f8"]}
        style={styles.wrapper}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.top}>
          <Text style={styles.small}>Welcome to</Text>
          <Text style={styles.title}>MediTrack</Text>
        </View>

        <View style={styles.center}>


          {/* image card sits above the circle */}
          <View style={styles.imageCard}>
            <Image
              source={require("../../assets/loginImg/Intro.png")}
              style={styles.image}
              resizeMode="cover"
              accessible
              accessibilityLabel="App intro image"
            />
          </View>

          {/* floating teal pill with a small med cross (visual accent) */}
        </View>

        <View style={styles.content}>
          <Text style={styles.headline}>Stay on track, Stay healthy</Text>
          <Text style={styles.sub}>
            Track your meds, take control of your health. Small habits - big
            impact.
          </Text>

          <Pressable
            onPress={()=>router.push('login/register')}
            android_ripple={{ color: "rgba(255,255,255,0.15)" }}
            style={({ pressed }) => [
              styles.ctaWrap,
              pressed && { transform: [{ scale: 0.985 }] },
            ]}
          >
            <LinearGradient
              colors={["#ff6b6b", "#ff4e50"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cta}
            >
              <Text style={styles.ctaText}>Continue</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </Pressable>
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 8 : 8,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  top: {
    width: "100%",
    alignItems: "flex-start",
  },
  small: {
    color: "#b94a46",
    fontSize: 13,
    fontWeight: "600",
    opacity: 0.9,
  },
  title: {
    color: "#da3b32",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 4,
  },

  center: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 6,
  },

  imageCard: {
    width: width - 20,
    height: (width - 30) * 0.72,
    borderRadius: 18,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.12,
    shadowRadius: 36,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  medBadge: {
    position: "absolute",
    right: width * 0.14,
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: "#e7fbf9",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#7dd6c8",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
  },

  crossBox: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  crossVertical: {
    position: "absolute",
    width: 6,
    height: 20,
    backgroundColor: "#2aa79b",
    borderRadius: 3,
  },
  crossHorizontal: {
    position: "absolute",
    height: 6,
    width: 20,
    backgroundColor: "#2aa79b",
    borderRadius: 3,
  },

  content: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  headline: {
    color: "#2e3032",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 6,
  },

  sub: {
    color: "#5a5a5a",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 380,
    marginBottom: 18,
  },

  ctaWrap: {
    width: "100%",
    marginTop: 6,
  },

  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 14,
    borderRadius: 999,
    width: "100%",
    maxWidth: 420,
    paddingHorizontal: 22,
    elevation: 6,
    shadowColor: "#ff6b6b",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
  },

  ctaText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },

  ghost: {
    marginTop: 12,
    paddingVertical: 8,
  },

  ghostText: {
    color: "#b94a46",
    textDecorationLine: "underline",
    fontWeight: "600",
  },

  footerNote: {
    color: "#8c8c8c",
    fontSize: 12,
    marginTop: 18,
    textAlign: "center",
  },
});
