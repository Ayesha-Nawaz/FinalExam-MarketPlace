import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import Colors from "@/constants/Colors";

// Custom TabBarIcon Component
const TabBarIcon: React.FC<{
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}> = ({ name, color }) => {
  return (
    <FontAwesome
      name={name}
      size={28}
      color={color}
      style={{ marginBottom: -3 }}
    />
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Common screen options
  const commonScreenOptions = (
    title: string,
    iconName: React.ComponentProps<typeof FontAwesome>["name"]
  ) => ({
    title,
    tabBarIcon: ({ color }: { color: string }) => (
      <TabBarIcon name={iconName} color={color} />
    ),
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web to prevent hydration errors.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen name="index" options={commonScreenOptions("Home", "home")} />
      <Tabs.Screen
        name="cart"
        options={commonScreenOptions("Cart", "shopping-cart")}
      />
      <Tabs.Screen
        name="profile"
        options={commonScreenOptions("Profile", "user")}
      />
    </Tabs>
  );
}
