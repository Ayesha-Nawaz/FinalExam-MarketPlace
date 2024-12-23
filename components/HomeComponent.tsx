import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

// Example product data
const products = [
  { id: "1", name: "Product A", screen: "productA" },
  { id: "2", name: "Product B", screen: "productB" },
  { id: "3", name: "Product C", screen: "productC" },
  { id: "4", name: "Product D", screen: "productD" },
  { id: "5", name: "Product E", screen: "productE" },
];

const HomeScreenComp = () => {
  const navigation = useNavigation();

  const handlePressCourse = (screen: string) => {
    navigation.navigate(screen); // Dynamically navigate to the provided screen route
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerText}>Explore Our Features</Text>
      <View style={styles.column}>
        {products.map((product) => (
          <Pressable
            key={product.id}
            onPress={() => handlePressCourse(product.screen)}
            style={styles.item}
          >
            <Text style={styles.itemText}>{product.name}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9", // Light background for better visibility
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 20,
    textAlign: "center",
  },
  column: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 3,
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "45%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderLeftWidth: 10,
    borderLeftColor: "#0047d3",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A90E2",
    textAlign: "center",
  },
});

export default HomeScreenComp;
