import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Setting from "../screens/Setting";
import Tuner from "../screens/Tuner";
import Practice from "../screens/Practice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;

          switch (route.name) {
            case "Practice":
              iconName = !focused ? "newspaper-sharp" : "newspaper-outline";
              break;
            case "Tuner":
              iconName = !focused ? "musical-notes-outline" : "musical-notes-sharp";
              break;
            default:
              iconName = !focused ? "settings-outline" : "settings-sharp";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}>
      <Tab.Screen name="Practice" component={Practice} />
      <Tab.Screen name="Tuner" component={Tuner} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
}

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={TabNavigation} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
