import React from "react";
import StackNavigation from "./components/Navigations";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CustomThemeProvider } from "./context/ColorThemeContext";
// import NativeDevSettings from "react-native/Libraries/NativeModules/specs/NativeDevSettings";
// import Config from "react-native-config";

export default function App() {
  // const connectToRemoteDebugger = () => {
  //   NativeDevSettings.setIsDebuggingRemotely(true);
  // };

  // if (Config.ENV === "DEVELOP") {
  //   // connectToRemoteDebugger();
  // }

  return (
    <SafeAreaProvider>
      <CustomThemeProvider>
        <StackNavigation />
      </CustomThemeProvider>
    </SafeAreaProvider>
  );
}
