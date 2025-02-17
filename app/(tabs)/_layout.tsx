import { Tabs } from "expo-router";
import React from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";

import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import CheckoutIcon from "@/assets/icon/checkout";
import SettingIcon from "@/assets/icon/setting";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: "Attendance",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="checkout"
        options={{
          title: "Checkout",
          tabBarButton: () => (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: [{ translateX: -20 }],
              }}
            >
              <TouchableOpacity
                onPress={() => console.log("Check Out Pressed")}
                style={{
                  backgroundColor: "#EF4444",
                  width: 50,
                  height: 50,
                  borderRadius: 35,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 5,
                }}
              >
                <CheckoutIcon color="#FFFFFF" width={32} height={32} />
              </TouchableOpacity>
              <Text className="text-center text-sm text-red-500 font-bold">
                Check out
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="form"
        options={{
          title: "Form",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="doc" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color }) => (
            <SettingIcon width={28} height={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
