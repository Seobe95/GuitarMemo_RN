import { ScrollView, ScrollViewProps, StyleSheet, View, ViewProps } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ColorThemeContext";
import { ColorsType } from "../utils/themeColor";

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
