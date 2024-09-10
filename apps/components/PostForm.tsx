import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useRef } from "react";
import InputField from "./InputField";
import { ThemeContext } from "../context/ColorThemeContext";
import { ColorsType } from "../style/themeColor.ts";
import { usePostStore } from "../zustand/usePostStore.ts";
import { StackNavigationParamList } from "./Navigations";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type PostFormProps = {
  navigation: NativeStackNavigationProp<
    StackNavigationParamList,
    "Post",
    undefined
  >;
};

export default function PostForm({ navigation }: PostFormProps) {
  const themeColor = useContext(ThemeContext);
  const styles = makeStyle(themeColor);

  const contentRef = useRef<TextInput | null>(null);
  const searchSongsRef = useRef<TextInput | null>(null);

  const { setTitle, setContent, song } = usePostStore();
  return (
    <>
      <InputField
        label={"Title"}
        placeholder="Please write down the title of the Practice!"
        autoFocus={true}
        returnKeyType="next"
        contextMenuHidden={true}
        onSubmitEditing={() => {
          contentRef.current?.focus();
        }}
        onChangeText={setTitle}
      />
      <View style={styles.emptyBox} />
      <InputField
        ref={contentRef}
        label={"Content"}
        style={styles.contentInput}
        multiline={true}
        contextMenuHidden={true}
        placeholder="Please write down the contents of the Practice!"
        scrollEnabled={true}
        numberOfLines={15}
        onChangeText={setContent}
      />
      <View style={styles.emptyBox} />
      <InputField
        ref={searchSongsRef}
        label={"Songs"}
        isSongs={true}
        style={styles.searchInput}
        clearButtonMode="always"
        onPressIn={() => {
          navigation.navigate("Search", { keyboardAutoFocus: true });
        }}
        placeholder="Please look up the song you practiced!"
      />
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const makeStyle = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      paddingBottom: 80,
      // gap: 16,
    },
    emptyBox: {
      marginVertical: 8,
    },
    contentInput: {
      minHeight: 17,
      maxHeight: 300,
    },
    searchInput: {
      // width: "90%",
      height: 35,
      marginBottom: 80,
    },
    searchBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-end",
    },
    label: {
      color: color.fontColor,
      fontSize: 16,
      marginBottom: 8,
    },
    searchItem: {
      backgroundColor: color.backgroundColor_2,
      paddingVertical: 8,
      borderRadius: 8,
    },
  });
