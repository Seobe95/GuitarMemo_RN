import { Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import React, { useContext } from "react";
import { ColorsType } from "../style/themeColor";
import { ThemeContext } from "../context/ColorThemeContext";

interface SearchListItemProps extends TouchableOpacityProps {
  song?: string;
  artist?: string;
  image?: string;
}

export default function SearchListItem({ artist, image, song, ...props }: SearchListItemProps) {
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);
  return (
    <TouchableOpacity {...props} style={[styles.container, props.style]}>
      <Image source={{ uri: image }} style={styles.coverImage} />
      <View style={styles.textContainer}>
        <Text style={[styles.defaultFont, styles.titleFont]}>{song}</Text>
        <Text style={[styles.defaultFont, styles.contentFont]}>{artist}</Text>
      </View>
    </TouchableOpacity>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
    },
    coverImage: {
      width: 60,
      height: 60,
    },
    textContainer: {
      marginLeft: 16,
    },
    defaultFont: {
      color: color.fontColor,
    },
    titleFont: {
      fontSize: 14,
      fontWeight: "500",
    },
    contentFont: {
      fontSize: 12,
    },
    createAtFont: {},
  });
