import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Button,
  RefreshControl,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const navigation = useNavigation(); // To navigate to other screens
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

  const handleCheckout = (product) => {
    navigation.navigate("Checkout", { product }); // Navigate to Checkout screen with selected product
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>

      <View style={styles.buttonsContainer}>
        <Button
          title="Remove"
          onPress={() => handleRemoveProduct(item.name)}
          color="#FF4D4D"
        />
        <Button
          title="Checkout"
          onPress={() => handleCheckout(item)} // Navigate to checkout screen
          color="#007BFF"
        />
      </View>
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
      <View style={{ flex: 1 }}>
        {/* Pull to Refresh functionality */}
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh} // Trigger the pull-to-refresh
          style={styles.refreshControl}
        />
        {cart.products.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        ) : (
          <FlatList
            data={cart.products}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.name}
          />
        )}
      </View>
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
  emptyCartText: {
    fontSize: 20,
    color: "#fff", // White color for empty cart message
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
  cartItem: {
    padding: 20,
    marginVertical: 15,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly transparent background
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginHorizontal: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333", // Dark color for product name
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    color: "#008000", // Green for price
    marginBottom: 8,
  },
  productQuantity: {
    fontSize: 16,
    marginVertical: 5,
    color: "#555", // Dark gray for quantity
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default CartScreen;
