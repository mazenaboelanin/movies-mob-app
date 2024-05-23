import { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import  Movie  from "../../models/Movie";
import { useNavigation } from '@react-navigation/native';


interface MovieListCardProps {
  movie: Movie;
}

const MovieListCard: FC<MovieListCardProps> = ({ movie }) => {

  const navigation = useNavigation();
  function handlePressedMovie(movieDetails: Movie) {
    navigation.navigate('Movie Details', { movieDetails });
  }

  return (
        <Pressable
          style={styles.pressableContainer}
          onPress={() => handlePressedMovie(movie)}>

          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
              style={styles.image} 
            />
          </View>


        <View style={styles.detailContainer}>
          <View style={ styles.marginBottom }>
            <Text style={ styles.title}>{movie?.title}</Text>
          </View>
          <View style={ styles.marginBottom }>
            <Text style={{color: '#CCC'}}>Release Date: {movie?.release_date}</Text>
          </View>
          <View style={ 
            [styles.marginBottom, parseFloat(movie?.vote_average.toFixed(1)) > 7 ? styles.rateGreenContainer : styles.rateRedContainer] }>
            <Text style={styles.rate}>Rate: {movie?.vote_average.toFixed(1)}</Text>
          </View>
        </View>

        </Pressable>

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


export default MovieListCard;