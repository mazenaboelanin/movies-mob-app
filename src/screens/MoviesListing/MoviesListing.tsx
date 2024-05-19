import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Button, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import  Movie  from "../../models/Movie";

const apiKey = '38e4a7fa63dea0b2c5c9dc5ce87d503d';

const MoviesListing: FC = ({ navigation }) => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function handlePressedMovie(movieDetails: Movie) {
    navigation.navigate('Movie Details', { movieDetails });
  }

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        if(response) {
          setMovies(response.data.results);
          console.log(response.data.results);
        }
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching movies');
      }
      setIsLoading(false);
    }

    fetchMovies();
  }, []);


  return (
    <View style={styles.container}>
      <Text>Movies Listing</Text>
      { isLoading && <Text>Loading...</Text> }

      { !isLoading && 
      
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handlePressedMovie(item)}>
            <View>
              <Text>{item?.title}</Text>
            </View>
            <View>
              <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item?.poster_path}` }} style={{ width: 100, height: 100 }} />
            </View>
            <View>
              <Text>{item?.release_date}</Text>
            </View>
            <View>
              <Text>{item?.vote_average}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item?.id.toString()}></FlatList>}
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