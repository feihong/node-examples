const axios = require('axios')

let params = {
  type: 'movie',
  tomatoes: 'true',
  plot: 'short',
  t: 'la la land',
  y: '2016',
}
params = Object.assign(params, {t: 'silence', y: '2016'})
// If year is not specified, will pick the 2008 movie.
// params = Object.assign(params, {t: 'passengers', y: '2016'})

let url = 'http://www.omdbapi.com/'

axios.get(url, {params})
.then(res => {
  let data = res.data
  if (data.Error !== undefined) {
    console.log('Status: %s, Error: %s', res.status, data.Error)
    return
  }

  let movie = data
  // console.log(movie)
  console.log(movie.Title)
  console.log(movie.Year)
  console.log('Directed by', movie.Director)
  console.log('Poster:', movie.Poster)
  console.log('Metascore:', movie.Metascore)
  console.log('IMDB rating:', movie.imdbRating)
  console.log('Tomato rating:', movie.tomatoRating)
})
