import CustomViewContainer from "../components/CustomViewContainer";
import PracticeList from "../components/PracticeList";
import { StyleSheet } from "react-native";

export default function Practice() {
  return (
    <CustomViewContainer style={styles.container}>
      <PracticeList />
    </CustomViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 0,
  },
});
