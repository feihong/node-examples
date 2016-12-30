require('isomorphic-fetch')
const qs = require('querystring')

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
let url = 'http://www.omdbapi.com/?' + qs.stringify(params)

fetch(url)
.then(res => res.json())
.then(data => {
  // console.log(data)
  console.log(data.Title)
  console.log(data.Year)
  console.log('Directed by', data.Director)
  console.log('Metascore:', data.Metascore)
  console.log('IMDB rating:', data.imdbRating)
  console.log('Tomato rating:', data.tomatoRating)
})
