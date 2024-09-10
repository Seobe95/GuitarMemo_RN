import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ColorsType } from "../style/themeColor";
import { ThemeContext } from "../context/ColorThemeContext";

type PracticeItemProps = {
  id: number;
  title: string;
  content: string;
  coverImageUrl: string;
  createdAt: Date;
};

const datas: PracticeItemProps[] = [
  {
    id: 0,
    title: "사랑의 미학",
    content: "연습했다잉",
    coverImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273149023dcdf178cffc8b994c3",
    createdAt: new Date(),
  },
  {
    id: 1,
    title: "No Pain",
    content: "연습했다잉2",
    coverImageUrl:
      "https://i.scdn.co/image/ab67616d00004851ca88c0dcebddf74a98c46134",
    createdAt: new Date(),
  },
];

export default function PracticeList() {
  return (
    <FlatList
      data={datas}
      renderItem={data => {
        const { item } = data;
        return <PracticeItem props={item} />;
      }}
      keyExtractor={item => item.title}
      style={styles.listContainer}
    />
  );
}

function PracticeItem({ props }: { props: PracticeItemProps }) {
  const { id, content, coverImageUrl, createdAt, title } = props;
  const themeColor = useContext(ThemeContext);
  const styles = makeStyles(themeColor);

  return (
    <View style={[styles.container, id == 0 && styles.itemMargin]}>
      <View>
        <Image
          style={styles.songsCover}
          alt="Practice Album Cover"
          source={{
            uri: coverImageUrl,
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.defaultFont, styles.titleFont]}>{title}</Text>
        <Text style={[styles.defaultFont]}>{content}</Text>
      </View>
    </View>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.backgroundColor,
      minHeight: 60,
      borderRadius: 10,
      padding: 8,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      gap: 16,
    },
    defaultFont: {
      color: color.fontColor,
    },
    titleFont: {
      fontWeight: "bold",
      fontSize: 16,
    },
    contentFont: {
      fontSize: 12,
    },
    songsCover: {
      width: 60,
      height: 60,
    },
    itemMargin: {
      marginVertical: 16,
    },
    textContainer: {
      flexDirection: "column",
    },
  });

const styles = StyleSheet.create({
  listContainer: {
    height: "100%",
  },
});
