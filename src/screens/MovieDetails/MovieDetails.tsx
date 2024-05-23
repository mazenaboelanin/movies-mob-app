import { FC, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import Movie from "../../models/Movie";
import MovieDetailCard from "../../components/MovieDetailCard/MovieDetailCard";

const MovieDetails: FC = ({route, navigation}) => {
  // STATES 
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieDetails } = route.params;

  // SIDE EFFECTS
  useEffect(() => {
      try {
        setIsLoading(true);
        setMovie(movieDetails);
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching movie details');
      }
      setIsLoading(false);
  });

  // set the title of the screen
  useEffect(() => {
    if (movie) {
      navigation.setOptions({ title: movie.title });
    }
  }, [movie, navigation]);

  // METHODS
  function renderLoader() {
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView  style={styles.ViewContainer}>

      <View style={styles.container}>
        { isLoading && renderLoader() }
      </View>

      {
        !isLoading && movie && 
        <MovieDetailCard movie={movie} />
      }

    </ScrollView>
  );
}



const styles = StyleSheet.create({
  ViewContainer: {
    backgroundColor: '#0f0e0e',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});


export default MovieDetails;