interface Movie {
    adult: boolean,
    poster_pathbackdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}


export default Movie;

/*

{
  "adult": false,
  "backdrop_path": "/j3Z3XktmWB1VhsS8iXNcrR86PXi.jpg",
  "genre_ids": [
      878,
      28,
      12
  ],
  "id": 823464,
  "original_language": "en",
  "original_title": "Godzilla x Kong: The New Empire",
  "overview": "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
  "popularity": 9778.73,
  "poster_path": "/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
  "release_date": "2024-03-27",
  "title": "Godzilla x Kong: The New Empire",
  "video": false,
  "vote_average": 7.2,
  "vote_count": 1760
},
*/