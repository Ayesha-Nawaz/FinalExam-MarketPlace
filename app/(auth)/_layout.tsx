import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack> 
        <Stack.Screen
        name="index"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#333333" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#333333" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      />
    
    </Stack>
  );
}
