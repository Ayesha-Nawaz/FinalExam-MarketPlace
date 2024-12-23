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
import { createUserWithEmailAndPassword, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/firebase/config";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AuthStackParamList = {
  signup: undefined;
  ForgotPassword: undefined;
  "(user)": undefined;
};

const SignUpComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // New state for phone number
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Modal visibility state
  const [verificationId, setVerificationId] = useState<string>(""); // State to store verification ID
  const [verificationCode, setVerificationCode] = useState<string>(""); // State to store verification code

  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const signUp = (): void => {
    if (!email && !phoneNumber) {
      Alert.alert("Please enter either an email or a phone number.");
      return;
    }

    setLoading(true);
    setIsModalVisible(true); // Show the modal when sign-up process starts

    if (email && password) {
      // Email sign-up
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed up:", user);
          navigation.navigate("(user)"); // Navigate to user home screen after successful sign-up
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert("Error", errorMessage);
        });
    } else if (phoneNumber) {
      // Phone number sign-up
      const phoneProvider = new PhoneAuthProvider(auth);
      phoneProvider
        .verifyPhoneNumber(phoneNumber, {
          // Adjust this to handle UI for code input
          recaptchaVerifier: recaptchaVerifier, // You'll need to implement reCAPTCHA handling for phone verification
        })
        .then((verificationId) => {
          setVerificationId(verificationId);
          Alert.alert("Verification code sent to your phone.");
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert("Error", errorMessage);
        });
    }
  };

  const verifyPhoneNumber = (): void => {
    if (!verificationCode) {
      Alert.alert("Please enter the verification code.");
      return;
    }

    const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
    signInWithCredential(auth, credential)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in with phone:", user);
        navigation.navigate("(user)"); // Navigate to user home screen after successful sign-up
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      {/* App Name Heading */}
      <Text style={styles.appName}>EduVerse</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Sign Up</Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ddd"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Phone Number Input */}
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#ddd"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        {/* Password Input */}
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
          style={styles.button}
          onPress={signUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* For phone verification */}
        {verificationId && (
          <View style={styles.input}>
            <TextInput
              style={styles.input}
              placeholder="Verification Code"
              placeholderTextColor="#ddd"
              keyboardType="number-pad"
              value={verificationCode}
              onChangeText={setVerificationCode}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={verifyPhoneNumber}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Verify Code</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.switchTextContainer}>
        <Text style={styles.switchText}>
          Already have an account?{" "}
          <Text
            style={styles.switchLink}
            onPress={() => navigation.navigate("index")}
          >
            Sign In
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
            <Text style={styles.modalText}>Signing up, please wait...</Text>
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

export default SignUpComponent;
