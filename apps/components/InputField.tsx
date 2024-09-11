import { StyleSheet, Text, TextInputProps, View } from "react-native";
import React, { useContext, forwardRef } from "react";
import { TextInput } from "react-native";
import { ThemeContext } from "../context/ColorThemeContext";
import { ColorsType } from "../style/themeColor";
import { usePostStore } from "../zustand/usePostStore";
import SearchListItem from "./SearchListItem";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "./Navigations";

interface InputFieldProps extends TextInputProps {
  isSongs?: boolean;
  label?: string;
}

const InputField = forwardRef<TextInput, InputFieldProps>(({ isSongs = false, label, ...props }, ref) => {
  const navigation = useNavigation<StackNavigationProp>();
  const themeColor = useContext(ThemeContext);
  const styles = makeStyle(themeColor);
  const { song, setSong } = usePostStore();

  const presentTextInputOrSongResultItem = () => {
    if (song !== null && isSongs) {
      return (
        <SearchListItem
          style={styles.searchItem}
          artist={song.artists[0].name}
          song={song.name}
          image={song.album.images[0].url}
          onPress={() => {
            navigation.navigate("Search", { keyboardAutoFocus: false });
          }}
        />
      );
    }
    return (
      <TextInput
        {...props}
        autoCapitalize={"none"}
        clearButtonMode="always"
        placeholderTextColor={themeColor.secondary}
        style={[styles.input, props.style]}
        ref={ref}
        autoCorrect={false}
      />
    );
  };
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      {presentTextInputOrSongResultItem()}
    </View>
  );
});

const makeStyle = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
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
      minHeight: 35,
    },
    searchItem: {
      backgroundColor: color.backgroundColor_2,
      paddingVertical: 8,
      borderRadius: 8,
      marginTop: 8,
    },
  });

export default InputField;
