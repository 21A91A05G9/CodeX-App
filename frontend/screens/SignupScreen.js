import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, ImageBackground } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const handleSignInPress = () => {
    navigation.navigate("Login");
  };

  const handleSignUpPress = () => {
    if (!email || !password || !name || !confirmPassword) {
      Alert.alert("Missing Information", "Please fill all the details");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(
        "Password mismatch",
        "Please confirm your password correctly."
      );
      return;
    }

    const userData = { name, email, password };
    axios
      .post("http://192.168.1.6:5000/register", userData)
      .then((res) => {
        console.log(res.data.status);
        if (res.data.status === "ok") {
          Alert.alert("Success", "Registered Successfully");
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response && error.response.status === 400) {
          Alert.alert("Login Failed", error.response.data.error);
        } else {
          Alert.alert("An error occurred. Please try again.");
        }
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/bg2.png")}
        style={[styles.background, styles.absolute]}
        imageStyle={{ opacity: 0.1 }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          label="Name"
          style={styles.input}
          mode="outlined"
          placeholder="Enter your name"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label="Email"
          style={styles.input}
          mode="outlined"
          placeholder="Enter your email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="Password"
          style={styles.input}
          mode="outlined"
          placeholder="Enter your password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          label="Confirm Password"
          style={styles.input}
          mode="outlined"
          placeholder="Confirm your password"
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleSignUpPress}
        >
          Sign Up
        </Button>
        <Text style={styles.signinText}>
          Already have an account?{" "}
          <Text style={styles.signinLink} onPress={handleSignInPress}>
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  absolute: {
    position: "absolute",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#FFFFFF", // White background for input
  },
  button: {
    marginTop: 20,
    backgroundColor: "#000000", // Black background for button
  },
  signinText: {
    marginTop: 20,
    textAlign: "center",
  },
  signinLink: {
    color: "red", // White color for link
    textDecorationLine: "underline",
  },
});

export default SignUpScreen;
