import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ColorThemeContext";
import { ColorsType } from "../style/themeColor";

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
}

export default function CustomButton({ title, ...props }: CustomButtonProps) {
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);

  return (
    <TouchableOpacity {...props} style={[styles.container, props.style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {},
    text: {
      color: color.fontColor,
    },
  });
