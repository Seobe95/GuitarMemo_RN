import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ColorThemeContext";
import { ColorsType } from "../style/themeColor";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { StackNavigationParamList } from "../components/Navigations";
import { useSearchStore } from "../zustand/useSearchStore";
import { debounce } from "lodash";
import { useSpotifyAuthStore } from "../zustand/useSportifyAuthStore";
import CustomViewContainer from "../components/CustomViewContainer";
import SearchListItem from "../components/SearchListItem";
import { usePostStore } from "../zustand/usePostStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type SearchNavigationProps = NativeStackScreenProps<StackNavigationParamList, "Search">;

export default function Search({ navigation, route }: SearchNavigationProps) {
  const { searchSongs, setSearchParams, searchResult } = useSearchStore();
  const { setSong, song } = usePostStore();
  const { accessToken } = useSpotifyAuthStore();
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);

  const handleSearch = useCallback(
    debounce(async () => {
      await searchSongs(accessToken);
    }, 1000),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <InputField
          style={styles.input}
          autoFocus={route.params.keyboardAutoFocus}
          placeholder="Please look up the song you practiced!"
          onChangeText={e => {
            setSearchParams(e);
            handleSearch();
          }}
          returnKeyType="search"
        />
        <CustomButton title="Cancel" style={styles.button} onPress={() => navigation.goBack()} />
      </View>
      <CustomViewContainer style={styles.serachListContainer}>
        <FlatList
          data={searchResult}
          keyExtractor={data => data.id}
          ItemSeparatorComponent={() => {
            return <View style={{ marginVertical: 8 }} />;
          }}
          renderItem={data => {
            const { album, artists, name } = data.item;
            const index = data.index;
            return (
              <SearchListItem
                style={{
                  ...styles.searchResultItem,
                  marginTop: index == 0 ? 16 : 0,
                }}
                song={name}
                artist={artists[0].name}
                image={album.images[0].url}
                onPress={() => {
                  setSong(data.item);
                  navigation.goBack();
                }}
              />
            );
          }}
          ListFooterComponent={() => {
            return <View></View>;
          }}
          ListFooterComponentStyle={{ marginVertical: 30 }}
        />
      </CustomViewContainer>
    </SafeAreaView>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: color.backgroundColor,
    },
    searchContainer: {
      width: "100%",
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    input: {
      width: "100%",
    },
    button: {
      width: "15%",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 8,
      marginTop: 8,
    },
    serachListContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: color.backgroundColor_1,
      paddingTop: 0,
    },
    searchResultItem: {
      backgroundColor: color.backgroundColor,
      paddingVertical: 8,
      paddingHorizontal: 8,
      marginHorizontal: 16,
      borderRadius: 8,
    },
  });
