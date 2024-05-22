import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import  Movie  from "../../models/Movie";
import {NativeModules} from 'react-native';
const { NetworkModule } = NativeModules;


// CONSTANTS
const API_KEY = '38e4a7fa63dea0b2c5c9dc5ce87d503d';
const BASE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
let MAX_PAGES = 0;

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
      const response = await NetworkModule.fetchData(`${BASE_URL}&page=${currentPage}`);
      if(response) {
        const parsedResponse = JSON.parse(response);
        setMovies([...movies, ...parsedResponse.results]);
        setMaxPages(parsedResponse.total_pages);
      }
    } catch (error) {
      console.log('Error fetching movies', error);
      // throw new Error('Error fetching movies');
    }
    setIsLoading(false);
  }

  function setMaxPages(maxPages: number){
    if (!MAX_PAGES) {
      MAX_PAGES = maxPages;
    }

  };

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
    if(currentPage >= MAX_PAGES) {
      return;
    }
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