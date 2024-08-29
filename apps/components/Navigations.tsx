import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Setting from "../screens/Setting";
import Tuner from "../screens/Tuner";
import Practice from "../screens/Practice";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext } from "../context/ColorThemeContext";
import { Text, TouchableOpacity } from "react-native";
import PracticePost from "../screens/PracticePost";

type StackNavigationParamList = {
  Main: undefined;
  Post: undefined;
};

type TabNavigationProps = NativeStackScreenProps<StackNavigationParamList, "Main">;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<StackNavigationParamList>();

function TabNavigation({ navigation, route }: TabNavigationProps) {
  const themeColor = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: themeColor.primary,
        tabBarInactiveTintColor: themeColor.secondary,
        tabBarStyle: {
          backgroundColor: themeColor.backgroundColor,
          borderTopWidth: 0,
        },
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
        headerStyle: {
          backgroundColor: themeColor.backgroundColor,
          shadowOpacity: 0,
          elevation: 0,
        },
      })}>
      <Tab.Screen
        name="Practice"
        component={Practice}
        options={{
          headerShown: true,
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }} onPress={() => navigation.push("Post")}>
              <Icon name={"add-outline"} size={32} color={themeColor.iconColor} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Tuner" component={Tuner} options={{ headerShown: false }} />
      <Tab.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function StackNavigation() {
  const themeColor = useContext(ThemeContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={TabNavigation} options={{ headerShown: false }} />
        <Stack.Screen
          name="Post"
          component={PracticePost}
          options={{
            headerStyle: {
              backgroundColor: themeColor.backgroundColor,
            },
            headerTitle: "Post Practice Memo",
            headerTitleStyle: {
              color: themeColor.fontColor,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
