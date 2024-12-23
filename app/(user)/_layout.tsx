import React from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "@/components/useColorScheme";

export default function UserLayout() {
  const colorScheme = useColorScheme();

  return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(appmain)" options={{ headerShown: false }} />
          <Stack.Screen name="(products)" options={{ headerShown: false }} />
          
        </Stack>
      </ThemeProvider>
  );
}
