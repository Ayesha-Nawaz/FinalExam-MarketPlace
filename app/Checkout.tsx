import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, Alert, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";

const CheckoutScreen = () => {
  const route = useRoute();
  const { product } = route.params; // Get the product data passed from CartScreen

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCheckout = () => {
    // Simple validation for card details
    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert("Error", "Please fill in all payment details.");
      return;
    }

    // Perform checkout logic (e.g., payment processing, order confirmation)
    alert(`Checking out ${product.name} for $${product.price}`);
  };

  return (
    <ImageBackground
      source={require('@/assets/images/image.jpeg')} // Path to your background image
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Checkout</Text>

        <Text style={styles.productName}>Product: {product.name}</Text>
        <Text style={styles.productPrice}>Price: ${product.price}</Text>
        <Text style={styles.productQuantity}>Quantity: {product.quantity}</Text>

        {/* Card Number Input */}
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        {/* Expiry Date Input */}
        <TextInput
          style={styles.input}
          placeholder="MM/YY"
          keyboardType="numeric"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />

        {/* CVV Input */}
        <TextInput
          style={styles.input}
          placeholder="CVV"
          keyboardType="numeric"
          secureTextEntry
          value={cvv}
          onChangeText={setCvv}
        />

        {/* Proceed to Checkout Button */}
        <Button title="Proceed to Checkout" onPress={handleCheckout} color="#007BFF" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Light background for the form
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  productName: {
    fontSize: 20,
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    marginBottom: 10,
    color: "#008000", // Green color for price
  },
  productQuantity: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 16,
  },
});

export default CheckoutScreen;
