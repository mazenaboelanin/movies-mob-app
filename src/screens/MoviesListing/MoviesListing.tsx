import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Button, FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import  Movie  from "../../models/Movie";


// CONSTANTS
const API_KEY = '38e4a7fa63dea0b2c5c9dc5ce87d503d';
const BASE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`

const MoviesListing: FC = ({ navigation }) => {

  // STATES
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // METHODS
  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  function handlePressedMovie(movieDetails: Movie) {
    navigation.navigate('Movie Details', { movieDetails });
  }

  async function fetchMovies() {
      try {
        // setIsLoading(true);
        const response = await axios.get(`${BASE_URL}&page=${currentPage}`);
        if(response) {
          setMovies([...movies, ...response.data.results]);
        }
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching movies');
      }
      setIsLoading(false);
  }

  async function onRefresh() {
    setIsRefreshing(true);
    setMovies([]); // Clear the movies
    setCurrentPage(1); // Reset the page number
    await fetchMovies(); // Fetch the movies again
    setIsRefreshing(false);
  }


  function renderLoader() {
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  async function loadMoreIems() {
    setCurrentPage(currentPage + 1);
    await fetchMovies();
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Movies Listing</Text>

      { isLoading && renderLoader()}

      { !isLoading && 
      <FlatList
        data={movies}
        onEndReached={loadMoreIems}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ListFooterComponent={renderLoader}

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
        keyExtractor={(item) => (item?.id + Math.random()).toString()}></FlatList>}
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

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  }
});


export default MoviesListing;