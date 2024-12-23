import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ImageBackground,
  TextInput,
} from "react-native";
import { useNavigation } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "Categories"));

        // Extract unique categories
        const categorySet = new Set();
        querySnapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.category) categorySet.add(data.category);
        });

        const categoryArray = [...categorySet];
        setCategories(categoryArray);
        setFilteredCategories(categoryArray);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryPress = (category) => {
    navigation.navigate("products", { category });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = categories.filter((category) =>
        category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/image.jpeg")}
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headerText}>Select Your Category of Products</Text>

        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search categories"
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {loading ? (
          <Text style={styles.loadingText}>Loading categories...</Text>
        ) : filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <Pressable
              key={index}
              style={styles.categoryButton}
              onPress={() => handleCategoryPress(category)}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </Pressable>
          ))
        ) : (
          <Text style={styles.noCategoriesText}>
            No categories found in the database.
          </Text>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 20,
    textAlign: "center",
  },
  loadingText: {
    textAlign: "center",
    color: "blue",
    marginTop: 20,
  },
  noCategoriesText: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
  categoryButton: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    alignItems: "center",
  },
  categoryText: {
    fontSize: 18,
    color: "#0047D3",
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    elevation: 3,
  },
});

export default CategoriesScreen;
