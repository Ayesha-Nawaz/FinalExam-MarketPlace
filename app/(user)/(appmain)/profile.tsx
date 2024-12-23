import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Alert, ImageBackground, TouchableOpacity } from "react-native";
import { auth } from "@/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate("(auth)");
    } catch (error) {
      console.error("Error signing out: ", error);
      Alert.alert("Error", "Failed to sign out. Please try again.");
    }
  };

  const handleEditProfile = () => {
    alert("Edit Profile Pressed");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.jpeg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header with Profile Image and Edit/Logout Buttons */}
          <View style={styles.header}>
            <Image
              source={{
                uri: "https://i.pinimg.com/564x/3c/1c/73/3c1c7364ed3445e25235b032ebc1dfe5.jpg",
              }}
              style={styles.profileImage}
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* User Info */}
          {user && (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.displayName || "N/A"}</Text>
              <Text style={styles.userInfoText}>Email: {user.email}</Text>
              <Text style={styles.userInfoText}>Age: {user.age || "N/A"}</Text>
              <Text style={styles.userInfoText}>Phone: {user.phoneNumber || "N/A"}</Text> {/* Phone Number */}
              <Text style={styles.userInfoText}>Address: {user.address || "N/A"}</Text>
            </View>
          )}

          {/* More Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() => alert("Order History")}>
              <Text style={styles.actionButtonText}>View Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => alert("Settings")}>
              <Text style={styles.actionButtonText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better readability
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
    borderRadius: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 4,
  },
  buttonsContainer: {
    justifyContent: "space-evenly",
    height: 100,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  userInfo: {
    marginTop: 20,
    marginBottom: 30,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  userInfoText: {
    fontSize: 16,
    color: "#ddd",
  },
  actionsContainer: {
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: "#0047D3",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
