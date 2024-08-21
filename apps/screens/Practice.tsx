import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PracticeList from "../components/PracticeList";

export default function Practice() {
  return (
    <SafeAreaView style={styles.container}>
      <PracticeList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
