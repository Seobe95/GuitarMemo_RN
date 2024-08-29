import { StyleSheet, Text, TextInputProps, View } from "react-native";
import React, { useContext, forwardRef } from "react";
import { TextInput } from "react-native";
import { ThemeContext } from "../context/ColorThemeContext";
import { ColorsType } from "../utils/themeColor";

interface InputFieldProps extends TextInputProps {
  isSongs?: boolean;
  label: string | null;
}

const InputField = forwardRef<TextInput, InputFieldProps>(
  ({ isSongs = false, label, ...props }, ref) => {
    const themeColor = useContext(ThemeContext);
    const styles = makeStyle(themeColor);
    return (
      <View>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          autoCapitalize={"none"}
          {...props}
          style={[styles.input, props.style]}
          ref={ref}
          autoCorrect={false}
        />
      </View>
    );
  },
);

const makeStyle = (color: ColorsType) =>
  StyleSheet.create({
    label: {
      color: color.fontColor,
      fontSize: 16,
    },
    input: {
      paddingVertical: 8,
      paddingHorizontal: 8,
      fontSize: 14,
      color: color.fontColor,
      borderColor: color.secondary,
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: color.backgroundColor_2,
      marginTop: 8,
    },
  });

export default InputField;
