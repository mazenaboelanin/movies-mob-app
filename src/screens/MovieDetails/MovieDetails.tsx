import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

const MovieDetails: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Movie Details </Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default MovieDetails;