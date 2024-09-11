import React, { createContext } from "react";
import { useColorScheme } from "react-native";
import {
  ColorsType,
  lightColorTheme,
  makeThemeColor,
} from "../style/themeColor";

type ThemeProviderProps = {
  children: React.ReactNode;
};

// 라이트모드의 기본 색상입니다.
const ThemeContext = createContext<ColorsType>(lightColorTheme);

function CustomThemeProvider({ children }: ThemeProviderProps) {
  const theme = useColorScheme();
  const themeColor = makeThemeColor({ usersColorScheme: theme });

  return (
    <ThemeContext.Provider value={themeColor}>{children}</ThemeContext.Provider>
  );
}

export { ThemeContext, CustomThemeProvider };
