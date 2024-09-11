import { StyleSheet, View, ViewProps } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ColorThemeContext";
import { ColorsType } from "../style/themeColor";

interface CustomViewChildrenProps extends ViewProps {
  children: React.ReactNode;
}

export default function CustomViewContainer({ children, ...props }: CustomViewChildrenProps) {
  const themeColor = useContext(ThemeContext);
  const styles = makeStyles(themeColor);

  return (
    <View {...props} style={[styles.container, props.style]}>
      {children}
    </View>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      // paddingHorizontal: 16,
      backgroundColor: color.backgroundColor_1,
    },
  });
