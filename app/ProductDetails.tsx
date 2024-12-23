import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Alert,
  ImageBackground,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetailScreen = () => {
  const { name, image, description, price } = useLocalSearchParams(); // Get product details
  const [quantity, setQuantity] = useState(1); // State to manage quantity

  // Handle adding product to cart in AsyncStorage
  const handleAddToCart = async () => {
    try {
      // Fetch existing cart data from AsyncStorage
      const cartData = await AsyncStorage.getItem("cart");
      let cart = cartData ? JSON.parse(cartData) : { products: [] };

      // Add the new product to the cart
      const newProduct = {
        name,
        image,
        description,
        price,
        quantity,
      };

      // Check if the product already exists in the cart, and update the quantity if necessary
      const existingProductIndex = cart.products.findIndex(
        (product) => product.name === name
      );
      if (existingProductIndex >= 0) {
        cart.products[existingProductIndex].quantity += quantity; // Increment quantity if product exists
      } else {
        cart.products.push(newProduct); // Add new product to cart
      }

      // Save updated cart to AsyncStorage
      await AsyncStorage.setItem("cart", JSON.stringify(cart));

      // Alert user that the product has been added to their cart
      Alert.alert("Added to Cart", `${name} (x${quantity}) has been added to your cart.`);
    } catch (error) {
      console.error("Error adding to cart: ", error);
      Alert.alert("Error", "There was an issue adding the product to your cart.");
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/image.jpeg")}
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.productContainer}>
          {image && <Image source={{ uri: image }} style={styles.productImage} />}
          <Text style={styles.productName}>{name}</Text>
          {price && <Text style={styles.productPrice}>${price}</Text>}
          {description && (
            <Text style={styles.productDescription}>{description}</Text>
          )}

          {/* Quantity controls */}
          <View style={styles.quantityContainer}>
            <Pressable
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))} // Decrease quantity
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>
            <Text style={styles.quantityText}>{quantity}</Text>
            <Pressable
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)} // Increase quantity
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>

          <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  productContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
    marginTop: 50,
  },
  productImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0047D3",
    marginTop: 20,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 22,
    color: "#008000",
    marginTop: 10,
    textAlign: "center",
  },
  productDescription: {
    fontSize: 18,
    color: "#333",
    marginTop: 15,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    backgroundColor: "#0047D3",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  quantityText: {
    fontSize: 20,
    color: "#333",
    marginHorizontal: 20,
  },
  addToCartButton: {
    marginTop: 20,
    backgroundColor: "#0047D3",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;
