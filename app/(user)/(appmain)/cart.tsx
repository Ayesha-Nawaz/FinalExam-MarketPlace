import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Button, RefreshControl, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = () => {
  const [cart, setCart] = useState({ products: [] });
  const [isRefreshing, setIsRefreshing] = useState(false); // State to handle the pull-to-refresh state

  // Fetch cart data from AsyncStorage
  const fetchCartData = async () => {
    try {
      const cartData = await AsyncStorage.getItem("cart");
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    } catch (error) {
      console.error("Error fetching cart data: ", error);
      Alert.alert("Error", "There was an issue fetching your cart.");
    }
  };

  // Handle the pull-to-refresh action
  const onRefresh = async () => {
    setIsRefreshing(true); // Start refreshing
    await fetchCartData();
    setIsRefreshing(false); // End refreshing
  };

  // Handle removing a product from the cart
  const handleRemoveProduct = async (productName) => {
    try {
      const updatedProducts = cart.products.filter(
        (product) => product.name !== productName
      );
      const updatedCart = { products: updatedProducts };

      // Update cart in AsyncStorage
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing product: ", error);
      Alert.alert("Error", "There was an issue removing the product.");
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
      <Button
        title="Remove"
        onPress={() => handleRemoveProduct(item.name)}
        color="#FF0000"
      />
    </View>
  );

  useEffect(() => {
    fetchCartData(); // Fetch cart data on component mount
  }, []);

  return (
    <ImageBackground
      source={require('@/assets/images/image.jpeg')} // Path to your background image
      style={styles.container}
    >
      {cart.products.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart.products}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.name}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh} // Trigger the pull-to-refresh
            />
          }
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center", // Center content vertically
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slight overlay to make text readable over the background
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff", // White text color for better contrast on dark backgrounds
    marginBottom: 20,
    textAlign: "center",
  },
  emptyCartText: {
    fontSize: 18,
    color: "#fff", // White color for empty cart message
    textAlign: "center",
    marginTop: 20,
  },
  cartItem: {
    padding: 15,
    marginVertical: 12,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Light transparent background
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Dark color for product name
  },
  productPrice: {
    fontSize: 16,
    color: "#008000", // Green for price
  },
  productQuantity: {
    fontSize: 16,
    marginVertical: 5,
    color: "#555", // Dark gray for quantity
  },
});

export default CartScreen;
