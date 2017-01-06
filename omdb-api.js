const axios = require('axios')

let params = {
  type: 'movie',
  tomatoes: 'true',
  title: 'la la land',
  year: '2016'
}
// params = Object.assign({title: 'jackie', year: '2016'}, params)
// If year is not specified, will pick the 2008 movie.
// params = Object.assign({title: 'passengers', year: '2016'}, params)

let url = 'http://omdbapi.com/'

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
  console.log('Metascore:', movie.Metascore)
  console.log('IMDB rating:', movie.imdbRating)
  console.log('Tomato rating:', movie.tomatoRating)
})
