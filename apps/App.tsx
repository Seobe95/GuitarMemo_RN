import { StyleSheet } from "react-native";
import React from "react";
import StackNavigation from "./components/Navigations";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useSpotifyAuth from "./hooks/useSpotifyAuth";
import { CustomThemeProvider } from "./context/ColorThemeContext";

export default function App() {
  const { fetchAuthToken, isAuth } = useSpotifyAuth();

  return (
    <SafeAreaProvider>
      <CustomThemeProvider>
        <StackNavigation />
      </CustomThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
