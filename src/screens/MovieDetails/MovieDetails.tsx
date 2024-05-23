import { FC, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
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


      // set the title of the screen
      useEffect(() => {
        if (movie) {
          navigation.setOptions({ title: movie.title });
        }
      }, [movie, navigation]);

  return (
    <ScrollView  style={styles.ViewContainer}>

      <View style={styles.container}>
        { isLoading && <Text>Loading...</Text> }
      </View>

      <View style={styles.container}>
      { 
        !isLoading && movie &&
        <View>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} 
            style={{ width: 400, height: 300, marginBottom: 10}} 
            />

          <View style={ styles.marginBottom }>
            <Text style={styles.title}>{movie.title}</Text>
          </View>

          <View style={styles.row}>

          <View style={movie.adult ? styles.adultRedContainer : styles.adultGreenContainer }>
            <Text style={styles.adult}> {movie.adult ? '+18' : '+12'}</Text>
          </View>

          <View style={ 
              [styles.marginBottom, parseFloat(movie?.vote_average.toFixed(1)) > 7 ? styles.rateGreenContainer : styles.rateRedContainer] }>
              <Text style={styles.rate}>Rate: {movie?.vote_average.toFixed(1)}</Text>
          </View>
          <View style={styles.lngContainer}>
            <Text style={styles.lng}> Language: {movie.original_language}</Text>
          </View>

          </View>

          { movie.overview &&
              <View style={styles.detailsContainer}>
                <Text style={styles.detailHeader}> Overview </Text>
                <Text style={styles.detailValue}>  {movie.overview}</Text>

                <Text style={[styles.detailHeader, {marginTop: 10, backgroundColor: '#CCC', color: 'black'}]}> Release Date </Text>
                <Text style={styles.detailValue}> {movie.release_date}</Text>
              </View>
          }

        </View>
      }
      </View>
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
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  marginBottom: {
    marginBottom: 10,
  },
  detailsContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    color: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
    padding: 10
  },
  detailHeader: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'darkred',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 5,
  },
  detailValue: {
    color: '#CCC',
    fontSize: 14,
    textAlign: 'justify'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  adultGreenContainer: {
    backgroundColor: 'darkgreen',
    borderRadius: 5,
    padding: 3,
    width: 40,
    marginRight: 5,
  },
  adultRedContainer: {
    backgroundColor: 'darkred',
    borderRadius: 5,
    padding: 3,
    width: 40,
    alignItems: 'center',
    marginRight: 5,
  },
  adult: {
    fontWeight: 'bold',
    color: '#CCC',
  },
  rateGreenContainer: {
    backgroundColor: 'darkgreen',
    borderRadius: 5,
    padding: 3,
    width: 70,
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  rateRedContainer: {
    backgroundColor: 'darkred',
    borderRadius: 5,
    padding: 3,
    width: 70,
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  rate: {
    fontWeight: 'bold',
    color: '#CCC',
  },
  lngContainer: {
    backgroundColor: '#CCC',
    borderRadius: 5,
    padding: 3,
    width: 150,
    alignItems: 'center',
    marginLeft: 5,
  },
  lng: {
    color: 'black',
    fontWeight: 'bold',
  }
});


export default MovieDetails;