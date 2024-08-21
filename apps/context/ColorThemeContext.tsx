import React, { createContext } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeContext = createContext<ColorSchemeName>(null);

function CustomThemeProvider({ children }: ThemeProviderProps) {
  const theme = useColorScheme();

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, CustomThemeProvider };
