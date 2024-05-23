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
  const [error, setError] = useState<string | null>(null);

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
        setError(null);
      } else {
        setError('No Data Found');
      }
    } catch (error) {
      console.log('Error fetching movies', error);
      setError('Error fetching movies');
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

  function renderError() {
    return (
      <View>
        <Text>
          { error }
        </Text>
      </View> 
    );
  }


  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>MoviesForYou</Text> */}

      { error && !isLoading && renderError()}

      { isLoading && !error && renderLoader()}

      { !isLoading && !error &&
      <FlatList
        data={movies}
        onEndReached={loadMoreIems}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ListFooterComponent={renderLoader}

        renderItem={({ item }) => (
          <Pressable
            style={styles.pressableContainer}
            onPress={() => handlePressedMovie(item)}>

            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: `https://image.tmdb.org/t/p/w500${item?.poster_path}` }}
                style={styles.image} 
              />
            </View>


          <View style={styles.detailContainer}>
            <View style={ styles.marginBottom }>
              <Text style={ styles.title}>{item?.title}</Text>
            </View>
            <View style={ styles.marginBottom }>
              <Text style={{color: '#CCC'}}>Release Date: {item?.release_date}</Text>
            </View>
            <View style={ 
              [styles.marginBottom, parseFloat(item?.vote_average.toFixed(1)) > 7 ? styles.rateGreenContainer : styles.rateRedContainer] }>
              <Text style={styles.rate}>Rate: {item?.vote_average.toFixed(1)}</Text>
            </View>
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
    backgroundColor: '#0f0e0e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressableContainer: {
    margin: 10,
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#161515',
    borderRadius: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  detailContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  marginBottom: {
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    flexWrap: 'wrap',
    flexShrink: 1,
    color: '#fff',
  },
  rateGreenContainer: {
    backgroundColor: 'darkgreen',
    borderRadius: 5,
    padding: 3,
    width: 70,
    alignItems: 'center',
  },
  rateRedContainer: {
    backgroundColor: 'darkred',
    borderRadius: 5,
    padding: 3,
    width: 70,
    alignItems: 'center',
  },
  rate: {
    fontWeight: 'bold',
    color: '#CCC',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: '#fff',
  }
});


export default MoviesListing;