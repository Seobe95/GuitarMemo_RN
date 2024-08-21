import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ColorsType, makeThemeColor } from "../utils/themeColor";
import { ThemeContext } from "../context/ColorThemeContext";

type PracticeItemProps = {
  title: string;
  content: string;
  coverImage: string;
  createdAt: Date;
  id: number;
};

const datas: PracticeItemProps[] = [
  {
    id: 0,
    title: "사랑의 미학",
    content: "연습했다잉",
    coverImage: "",
    createdAt: new Date(),
  },
  {
    id: 1,
    title: "No Pain",
    content: "연습했다잉2",
    coverImage: "",
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
  const { id, content, coverImage, createdAt, title } = props;
  const theme = useContext(ThemeContext);
  const themeColor = makeThemeColor({ usersColorScheme: theme });
  const styles = makeStyles(themeColor);

  return (
    <View style={[styles.container, id == 0 && styles.itemMargin]}>
      <Text style={styles.font}>{title}</Text>
    </View>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.backgroundColor,
      minHeight: 80,
      borderRadius: 10,
    },
    font: {
      color: color.fontColor,
    },
    itemMargin: {
      marginVertical: 16,
    },
  });

const styles = StyleSheet.create({
  listContainer: {
    height: "100%",
  },
});
