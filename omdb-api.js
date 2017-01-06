const axios = require('axios')

// let params = {
//   t: 'la la land',
//   type: 'movie',
//   tomatoes: 'true'
// }
let params = {
  t: 'passengers',
  type: 'movie',
  tomatoes: 'true',
  y: '2016',    // if not specified, will pick the 2008 movie
}
let url = 'http://www.omdbapi.com/'

axios.get(url, {params})
.then(res => res.data)
.then(movie => {
  // console.log(data)
  console.log(movie.Title)
  console.log(movie.Year)
  console.log('Directed by', movie.Director)
  console.log('Metascore:', movie.Metascore)
  console.log('IMDB rating:', movie.imdbRating)
  console.log('Tomato rating:', movie.tomatoRating)
})
