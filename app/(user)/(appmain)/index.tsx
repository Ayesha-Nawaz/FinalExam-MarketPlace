import React from "react";
import { StyleSheet, View, Text, ImageBackground, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MainScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/appback.jpeg")} // Replace with your background image path
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Header Section */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>
              Welcome to <Text style={styles.marketplaceText}>MarketPlaceX</Text>
            </Text>
            <Text style={styles.subtitleText}>
              Unlock Your Potential, Empower Your Future
            </Text>
          </View>

          {/* Marketplace Highlights */}
          <View style={styles.highlightsContainer}>
            <Text style={styles.highlightTitle}>Why Choose MarketPlaceX?</Text>
            <Text style={styles.highlightText}>
              - Find a wide variety of products from trusted sellers
            </Text>
            <Text style={styles.highlightText}>
              - Convenient online shopping with doorstep delivery
            </Text>
            <Text style={styles.highlightText}>
              - Secure payment options to ensure peace of mind
            </Text>
            <Text style={styles.highlightText}>
              - Special discounts and offers for loyal customers
            </Text>
          </View>

          {/* Explore More Button */}
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.exploreButton}
              onPress={() => navigation.navigate("(products)")}
            >
              <Text style={styles.buttonText}>Explore Now</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  headerTextContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  marketplaceText: {
    color: "#FFD700", // Gold color for emphasis
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitleText: {
    color: "#E0E0E0",
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
    fontStyle: "italic",
  },
  highlightsContainer: {
    marginTop: 30,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  highlightTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0047D3", // Blue color
    textAlign: "center",
    marginBottom: 10,
  },
  highlightText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  exploreButton: {
    backgroundColor: "#FFD700", // Gold color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#0047D3", // Blue color for text
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
