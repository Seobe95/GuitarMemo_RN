import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ColorThemeContext";
import { ColorsType } from "../style/themeColor";
import CustomScrollView from "../components/CustomScrollView";
import PostForm from "../components/PostForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationParamList } from "../components/Navigations";

type PostNavigationProps = NativeStackScreenProps<StackNavigationParamList, "Post">;

export default function PracticePost({ navigation }: PostNavigationProps) {
  const themeColor = useContext(ThemeContext);
  const styles = makeStyle(themeColor);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      style={{ paddingBottom: 80 }}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
        style={{ paddingBottom: 80 }}>
        <CustomScrollView style={styles.container}>
          <PostForm navigation={navigation} />
        </CustomScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
      marginBottom: 80,
    },
    searchBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-end",
    },
  });
