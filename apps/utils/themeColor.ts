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
  fontColor: "#000000", // 검은색 폰트
  iconColor: "#000000", // 검은색 아이콘
  backgroundColor: "#FFFFFF", // 흰색 배경
  backgroundColor_1: "#F0F0F0", // 약간 어두운 흰색 배경 (서브 배경)
  backgroundColor_2: "#E0E0E0", // 더 어두운 흰색 배경 (서브 배경)
  primary: "#000000", // 기본 색상 (검은색)
  secondary: "#7F7F7F", // 보조 색상 (중간 회색)
};

const darkColorTheme: ColorsType = {
  fontColor: "#FFFFFF", // 하얀색 폰트
  iconColor: "#FFFFFF", // 하얀색 아이콘
  backgroundColor: "#000000", // 검은색 배경
  backgroundColor_1: "#1A1A1A", // 약간 밝은 검은색 배경 (서브 배경)
  backgroundColor_2: "#333333", // 더 밝은 검은색 배경 (서브 배경)
  primary: "#FFFFFF", // 기본 색상 (하얀색)
  secondary: "#B3B3B3", // 보조 색상 (연한 회색)
};

/**
 *
 * @param ColorSchemeName 유저의 테마 타입입니다.
 * @returns 유저의 테마에 따라 모드에 맞는 theme이 return 됩니다. null & undefined => light
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
