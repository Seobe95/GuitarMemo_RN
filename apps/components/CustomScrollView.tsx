import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ColorThemeContext";
import { ColorsType } from "../style/themeColor";

interface CustomViewChildrenProps extends ScrollViewProps {
  children: React.ReactNode;
}

export default function CustomScrollView({ children, ...props }: CustomViewChildrenProps) {
  const themeColor = useContext(ThemeContext);
  const styles = makeStyles(themeColor);

  return (
    <ScrollView {...props} style={[styles.container, props.style]}>
      {children}
    </ScrollView>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      paddingHorizontal: 16,
      paddingTop: 16,
      backgroundColor: color.backgroundColor_1,
    },
  });
