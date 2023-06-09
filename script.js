const APIKey = 'b561f2ff1a96972581e6a5fff508215e'


pageNumber = 0 

const APIAccesser = async () => {
    pageNumber += 1
    console.log(pageNumber) 
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=b561f2ff1a96972581e6a5fff508215e&page=${pageNumber}`

    const res = await fetch(url)
    const data = await res.json()
    console.log(data)

    console.log(data.results)
    data.results.forEach((item) => {
     movieAdder(item)
    })
}   



const movieList = document.getElementById('movie-grid')

const movieAdder = (movieObject) => {
    // create our div that distinguishes a movie card
    const movie = document.createElement('div')

    movie.setAttribute('class', 'movie-card')

    // we get our image url from the movieObject and add it 
    // to our movie-card

    const movieURL =  `https://image.tmdb.org/t/p/w500/${movieObject.poster_path}`

    const moviePoster = document.createElement('img')
    
    // we create the img element with the poseter url
    // and add the neccessary class name
    moviePoster.setAttribute('src', movieURL)
    moviePoster.setAttribute('class', 'movie-poster')

    movie.appendChild(moviePoster)
    
    const movieTitle = document.createElement('h3')

    movieTitle.innerHTML = movieObject.title

    movieTitle.setAttribute('class', 'movie-title')

    const movieRating = document.createElement('h4')

    movieRating.innerHTML = movieObject.vote_average

    movieRating.setAttribute('class', 'movie-rating')

    movie.appendChild(movieRating)
    movie.appendChild(movieTitle)

    movieList.appendChild(movie)
}

const loadMoreButton = document.getElementById('load-more-movies-btn')

const addEventListeners = (loadMore) => {
    loadMore.addEventListener ('click', () => {
        APIAccesser()
    })
}

window.onload = () => {
    APIAccesser()
    addEventListeners(loadMoreButton)
}