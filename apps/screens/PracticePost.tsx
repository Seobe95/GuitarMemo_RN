import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useContext, useRef } from "react";
import { ThemeContext } from "../context/ColorThemeContext";
import { ColorsType } from "../utils/themeColor";
import InputField from "../components/InputField";
import CustomScrollView from "../components/CustomScrollView";
import { usePostStore } from "../zustand/useSongSearchStore";
import { useSpotifyAuthStore } from "../zustand/useSportifyAuthStore";
import { debounce } from "lodash";

export default function PracticePost() {
  const themeColor = useContext(ThemeContext);
  const styles = makeStyle(themeColor);
  const contentRef = useRef<TextInput | null>(null);
  const searchSongsRef = useRef<TextInput | null>(null);
  const { setTitle, setSongs, setContent, searchSongs } = usePostStore();
  const { accessToken } = useSpotifyAuthStore();
  const handleSearch = useCallback(
    debounce(async () => {
      await searchSongs(accessToken);
    }, 1000),
    [],
  );

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
            onContentSizeChange={e => {
              console.log(e.nativeEvent.contentSize.height);
            }}
            onChangeText={setContent}
          />
          <View style={styles.emptyBox} />
          <InputField
            ref={searchSongsRef}
            label={"Songs"}
            isSongs={true}
            style={styles.searchInput}
            placeholder="Please look up the song you practiced!"
            onChangeText={async e => {
              setSongs(e);
              handleSearch();
            }}
          />
        </CustomScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

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
