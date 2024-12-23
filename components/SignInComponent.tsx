import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AuthStackParamList = {
  signup: undefined;
  ForgotPassword: undefined;
  "(user)": undefined;
};

const SignInComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Modal visibility state

  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const signIn = (): void => {
    if (!email || !password) {
      Alert.alert("Please fill in both fields.");
      return;
    }

    setLoading(true);
    setIsModalVisible(true); // Show the modal when sign-in process starts

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
        navigation.navigate("(user)");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
      })
      .finally(() => {
        setLoading(false);
        setIsModalVisible(false); // Hide the modal once the process is complete
      });
  };

  return (
    <View style={styles.container}>
      {/* App Name Heading */}
      <Text style={styles.appName}>MarketPlaceX</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ddd"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            placeholderTextColor="#ddd"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <FontAwesome
              name={isPasswordVisible ? "eye-slash" : "eye"}
              size={24}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("ForgetPassword")}
        >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={signIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.switchTextContainer}>
        <Text style={styles.switchText}>
          Don't have an account?{" "}
          <Text
            style={styles.switchLink}
            onPress={() => navigation.navigate("signup")}
          >
            Sign Up
          </Text>
        </Text>
      </View>

      {/* Modal to show the "Please wait" message */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text style={styles.modalText}>Logging in, please wait...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 30,
    textAlign: "center",
    textShadowColor: "#FFC1CC",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "#FFC1CC",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    color: "#f3ab2c",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 20,
    padding: 30,
    paddingTop: 50,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: 25,
    width: "100%",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 20,
    fontSize: 16,
    color: "#333",
  },
  forgotPassword: {
    color: "#FFD700",
    fontSize: 14,
    textAlign: "right",
    marginBottom: 15,
    fontWeight: "600",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  button: {
    backgroundColor: "#f3ab2c",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  switchTextContainer: {
    marginTop: 20,
  },
  switchText: {
    fontSize: 18,
    color: "#007BFF",
  },
  switchLink: {
    color: "#f3ab2c",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  // Styles for the modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginTop: 10,
    color: "#333",
  },
});

export default SignInComponent;
