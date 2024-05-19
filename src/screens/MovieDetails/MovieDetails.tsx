import { FC, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Movie from "../../models/Movie";

const MovieDetails: FC = ({route, navigation}) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieDetails } = route.params;
  console.log(movieDetails);

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


  return (
    <View style={styles.container}>
      <Text>Movie Details </Text>

      { isLoading && <Text>Loading...</Text> }

      { 
        !isLoading && movie &&
        <View>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={{ width: 300, height: 300 }} />
          <Text> title: {movie.title}</Text>
          <Text> overview: {movie.overview}</Text>
          <Text> release_date: {movie.release_date}</Text>
          <Text> vote_average: {movie.vote_average}</Text>
          <Text> Vote Count: {movie.vote_count}</Text>
          <Text> original_language: {movie.original_language}</Text>
          <Text> popularity: {movie.popularity}</Text>

          <Text> Adult:  {movie.adult ? '+18' : '+12'}</Text>
          {/* <Text> {movie.video}</Text> */}


        </View>
      }
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