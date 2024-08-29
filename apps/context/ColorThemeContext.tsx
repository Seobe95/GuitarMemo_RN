import React, { createContext } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";
import { ColorsType, makeThemeColor } from "../utils/themeColor";

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeContext = createContext<ColorsType>({
  fontColor: "#000000", // 검은색 폰트
  iconColor: "#000000", // 검은색 아이콘
  backgroundColor: "#FFFFFF", // 흰색 배경
  backgroundColor_1: "#F0F0F0", // 약간 어두운 흰색 배경 (서브 배경)
  backgroundColor_2: "#E0E0E0", // 더 어두운 흰색 배경 (서브 배경)
  primary: "#000000", // 기본 색상 (검은색)
  secondary: "#7F7F7F", // 보조 색상 (중간 회색)
});

function CustomThemeProvider({ children }: ThemeProviderProps) {
  const theme = useColorScheme();
  const themeColor = makeThemeColor({ usersColorScheme: theme });

  return <ThemeContext.Provider value={themeColor}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, CustomThemeProvider };
