// namaz/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function CourseLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Categories', 
          headerStyle: { backgroundColor: '#6a1b9a' }, // Customize header style if needed
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="products" 
        options={{ 
          title: 'Products', 
          headerStyle: { backgroundColor: '#6a1b9a' }, // Customize header style if needed
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="ProductDetails" 
        options={{ 
          title: 'Details', 
          headerStyle: { backgroundColor: '#6a1b9a' }, // Customize header style if needed
          headerTintColor: '#fff',
        }} 
      />
    </Stack>
  );
}
