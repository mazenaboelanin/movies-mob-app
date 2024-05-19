import { FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const MoviesListing: FC = ({ navigation }) => {

  function handlePressedMovie() {
    navigation.navigate('Movie Details');
  }


  return (
    <View style={styles.container}>
      <Text>Movies Listing</Text>
      <Button title="Go to Movie Details" onPress={handlePressedMovie} />
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


export default MoviesListing;