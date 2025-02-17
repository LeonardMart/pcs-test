import React from "react";
import { Stack } from "expo-router";
import "react-native-reanimated";
import "../../nativewind-env.d.ts";
import "../../global.css";

export default function NotificationLayout() {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
  );
}
