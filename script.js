//create a global variable for a pag number
let PageNumber = 0 

// create booleans that distinguish if we are displaying a search 
// or the 
let search = false

let trending = true

// this holds the value the user is searching
let searchQuery = ''

// retrieve the values we will be working with
const searchSubmit = document.getElementById('search-submit')

const loadMoreButton = document.getElementById('load-more-movies-btn')

const flixterTitle = document.getElementById('title')

// this function clls the API for it's general 
const trendingAccesser = async () => {
    // increment PageNumber to account for the load more
    PageNumber += 1

    // create the url for the API
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=b561f2ff1a96972581e6a5fff508215e&page=${PageNumber}`

    // retrieve what the URL gives us
    const res = await fetch(url)
    const data = await res.json()
    
    data.results.forEach((item) => {
        movieAdder(item)
    })
}



const searchAccesser = async (searchString) => {
    PageNumber += 1
    
    const url = `https://api.themoviedb.org/3/search/movie?api_key=b561f2ff1a96972581e6a5fff508215e&query=${searchString}&include_adult=false&language=en-US&page=${PageNumber}`

    const res = await fetch(url)
    const data = await res.json()
    console.log(data)

    console.log(data.results)
    data.results.forEach((item) => {
        movieAdder(item)
    })

}

const movieList = document.getElementById('movie-grid')

const pageReset = () => {
    PageNumber = 0

    searchQuery = ''
    
    movieList.innerHTML = ''

    trending = true

    search = false
}

const movieAdder = (movieObject) => {
    // create our div that distinguishes a movie card
    const movie = document.createElement('div')

    movie.setAttribute('class', 'movie-card')

    // we get our image url from the movieObject and add it 
    // to our movie-card

    let movieURL = ''

    if (movieObject.poster_path == null){
        movieURL = 'no-preview.png'
    }

    else{
        movieURL =  `https://image.tmdb.org/t/p/w500/${movieObject.poster_path}`
    }

    ``

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

    movieRating.innerHTML = `⭐ ${movieObject.vote_average}`

    movieRating.setAttribute('class', 'movie-rating')

    movie.appendChild(movieTitle)
    
    movie.appendChild(movieRating)

    movieList.appendChild(movie)
}

const addEventListeners = (loadMore, searchSubmit, titleReset) => {
    loadMore.addEventListener ('click', () => {
        if (trending){
            trendingAccesser()
        }
        else if (search){
            searchAccesser(searchQuery)
        }
    })
    
    searchSubmit.addEventListener('click', () => {
        pageReset()

        search = true

        trending = false
        
        searchQuery = document.getElementById('search-input').value
        
        if (searchQuery == ''){
            pageReset()

            trendingAccesser()
        }
        else{
            searchAccesser(searchQuery)
        }
    })

    titleReset.addEventListener('click', () => {
        pageReset()

        trendingAccesser()
    })
}

window.onload = () => {
    trendingAccesser()
    addEventListeners(loadMoreButton, searchSubmit, flixterTitle)
}