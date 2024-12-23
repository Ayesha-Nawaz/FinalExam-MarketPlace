import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Link } from "expo-router";

const CategoryProductsScreen = () => {
  const { category } = useLocalSearchParams(); // Get the category from navigation params
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "Products"),
          where("category", "==", category)
        );
        const querySnapshot = await getDocs(q);

        const productData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productData);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  const handleAddToCart = (product) => {
    Alert.alert("Added to Cart", `${product.name} has been added to your cart.`);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.productImage} />
      )}
      <Text style={styles.productName}>{item.name}</Text>
      {item.price && <Text style={styles.productPrice}>${item.price}</Text>}
      
      <Link
        href={{
          pathname: "/ProductDetails",
          params: {
            name: item.name,
            image: item.image,
            description: item.description,
            price: item.price,
          },
        }}
      >
        <Text style={styles.viewDetailsText}>View Details</Text>
      </Link>
    </View>
  );

  return (
    <ImageBackground
      source={require("@/assets/images/image.jpeg")}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.headerText}>{category} Products</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading products...</Text>
      ) : products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noProductsText}>
          No products found in this category.
        </Text>
      )}
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
  noProductsText: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
  productItem: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    alignItems: "center",
  },
  productName: {
    fontSize: 18,
    color: "#0047D3",
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    color: "#008000",
    marginTop: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: "#0047D3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  viewDetailsText: {
    marginTop: 10,
    color: "#FFD700",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});

export default CategoryProductsScreen;
