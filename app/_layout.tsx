import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/components/useColorScheme";
import { auth, db } from "@/firebase/config"; // Firebase config import
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Firestore functions import
import { View, ActivityIndicator } from "react-native";

// Prevent splash screen from hiding until fonts and auth state are checked
SplashScreen.preventAutoHideAsync();

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [profileChecked, setProfileChecked] = useState(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && authChecked && profileChecked) {
      SplashScreen.hideAsync();
    }
  }, [loaded, authChecked, profileChecked]);

  useEffect(() => {
    // Step 1: Check user authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);

      // Step 2: If user is authenticated, check if profile exists
      if (currentUser) {
        checkUserProfile(currentUser.uid);
      } else {
        setProfileChecked(true); // No user, so profile check is complete
      }
    });

    return unsubscribe;
  }, []);

  // Function to check user profile in Firestore
  const checkUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setProfileChecked(true);
      } else {
        console.log("No user profile found in Firestore.");
        setProfileChecked(true); // Proceed even if the profile doesn't exist
      }
    } catch (error) {
      console.error("Error checking user profile:", error);
      setProfileChecked(true); // Proceed in case of an error to avoid blocking
    }
  };

  // Show loading indicator until auth and profile are checked
  if (!authChecked || !loaded || !profileChecked) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Conditional rendering based on authentication
  return user ? <UserLayoutNav /> : <AuthLayoutNav />;
}

// Layout for authenticated users
function UserLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

// Layout for unauthenticated users (auth screens)
function AuthLayoutNav() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
