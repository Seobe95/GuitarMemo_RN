import { ColorSchemeName } from "react-native";

/**
 * 커스텀 컬러 값의 타입
 */
export interface ColorsType {
  fontColor: string;
  iconColor: string;
  backgroundColor: string;
  backgroundColor_1: string;
  backgroundColor_2: string;
  primary: string;
  secondary: string;
}

const lightColorTheme: ColorsType = {
  fontColor: "black",
  iconColor: "",
  primary: "",
  secondary: "",
  backgroundColor: "white",
  backgroundColor_1: "",
  backgroundColor_2: "",
};

const darkColorTheme: ColorsType = {
  fontColor: "white",
  iconColor: "",
  primary: "",
  secondary: "",
  backgroundColor: "black",
  backgroundColor_1: "",
  backgroundColor_2: "",
};

/**
 *
 * @param ColorSchemeName 유저의 테마 타입입니다.
 * @returns 유저의 테마에 따라 모드에 맞는 stylesheet가 return 됩니다.
 */
export const makeThemeColor = ({
  usersColorScheme,
}: {
  usersColorScheme: ColorSchemeName;
}): ColorsType => {
  if (usersColorScheme == "dark") {
    return darkColorTheme;
  }
  return lightColorTheme;
};
