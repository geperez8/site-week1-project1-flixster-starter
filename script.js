//create a global variable for a pag number
let PageNumber = 0 

// create booleans that distinguish if we are displaying a search 
// or the 
let search = false

let trending = true

// this holds the value the user is searching
let searchQuery = ''

// retrieve the values we will be working with
const searchSubmit = document.getElementById('search-input')

const loadMoreButton = document.getElementById('load-more-movies-btn')

const flixterTitle = document.getElementById('title')

const movieList = document.getElementById('movie-grid')

// this function clls the API for it's general 
const trendingAccesser = async () => {
    // increment PageNumber to account for the load more
    PageNumber += 1

    // create the url for the API
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=b561f2ff1a96972581e6a5fff508215e&page=${PageNumber}`

    // retrieve what the URL gives us
    const res = await fetch(url)
    const data = await res.json()
    
    // we run the movieAdder function on every movieObject we get in our 
    // array of movieobjects
    data.results.forEach((movieObject) => {
        movieAdder(movieObject)
    })
}


// this function calls the API based on a search query the user makes
const searchAccesser = async (searchString) => {
    // we increment the pageNumber on every call to account for the set of movies we
    // want to display when we press load more
    PageNumber += 1
    
    // we create the url using the page numbr and what the user wanted to search
    const url = `https://api.themoviedb.org/3/search/movie?api_key=b561f2ff1a96972581e6a5fff508215e&query=${searchString}&include_adult=false&language=en-US&page=${PageNumber}`

    // retrieve what the URL gives us
    const res = await fetch(url)
    const data = await res.json()
    
    // we run the movieAdder function on every movieObject
    data.results.forEach((movieObject) => {
        movieAdder(movieObject)
    })

}

// this resets our page to the original display of trending movies
const pageReset = () => {
    //we reset the PageNumber to 0
    PageNumber = 0

    // we clear the searchQuery
    searchQuery = ''
    
    // we clear the movie cards
    movieList.innerHTML = ''

    // we return back to trending movies
    trending = true

    search = false

    
}


// this function takes in a movieObject and extracts the title, rating, and
// poster to then add it to our HTML
const movieAdder = (movieObject) => {
    // create our div that distinguishes a movie card
    const movie = document.createElement('div')

    // give it the appropriate class
    movie.setAttribute('class', 'movie-card')

    // we get our image path from our movieObjec

    //our posterURL is intialzed as empty
    let posterURL = ''

    // if our posterPath is empty, we default to a no-preview image
    if (movieObject.poster_path == null){
        posterURL = 'no-preview.png'
    }

    // if there is a path, we create a URL that we will use to retrieve
    // the poster image
    else{
        posterURL =  `https://image.tmdb.org/t/p/w500/${movieObject.poster_path}`
    }
    
    // we create the img element with the poster URL and add the neccessary class name
    const moviePoster = document.createElement('img')

    moviePoster.setAttribute('src', posterURL)
    
    moviePoster.setAttribute('class', 'movie-poster')

    // we create a h3 elememnt for our movieTitle and add the title string
    // from our movieObject to it and add the appropriate class to it
    const movieTitle = document.createElement('h3')

    movieTitle.innerHTML = movieObject.title

    movieTitle.setAttribute('class', 'movie-title')

    // we create a h4 elememnt for our movieTitle and add the review string
    // from our movieObject to it and add the appropriate class to it
    const movieRating = document.createElement('h4')

    movieRating.innerHTML = `⭐ ${movieObject.vote_average}`

    movieRating.setAttribute('class', 'movie-rating')

    // we append the img, h3, and h4 element to the movie-card div we created
    movie.appendChild(moviePoster)

    movie.appendChild(movieTitle)
    
    movie.appendChild(movieRating)

    // add the card to the movie-grid we have in our HTML
    movieList.appendChild(movie)
}


// this function add the appropriate listeners to all the required elements in our HTML
const addEventListeners = (loadMore, searchSubmit, titleReset) => {
    
    // this adds an event listener to our loadMore function that calls the API
    loadMore.addEventListener ('click', () => {

        //if trending is true, we call the trending API when load more is pressed
        if (trending){
            trendingAccesser()
        }

        // if search is true, we call the API with the query
        else if (search){
            searchAccesser(searchQuery)
        }
    })

    // this adds an enter key listener to our search bar that will take the
    // inputted text and do a searc queryusing it
    searchSubmit.addEventListener('keypress', (e) => {

        // this detects that the key is enter
        if (e.key === 'Enter') {
            //prevents the page rom automatically reloading
            e.preventDefault()
            
            // resets the page
            pageReset()
            
            // changes our booleans to note we are now searching
            search = true
    
            trending = false
            
            // gets our search query from our input element
            searchQuery = document.getElementById('search-input').value
            
            // deletes the user input from the search bar
            document.getElementById('search-input').value = ''

            //console.log(searchQuery)
            
            // if the user didn't input anything, just show trending
            if (searchQuery == ''){
                pageReset()
    
                trendingAccesser()
            }

            // if the user dd input something, call a search query on their input
            else{
                searchAccesser(searchQuery)
            }
        }
    })   

    // this listener resets the page when the user clicks on the Flixer title
    titleReset.addEventListener('click', () => {
        pageReset()

        trendingAccesser()
    })
}

// this function loads uur trending movies and adds our event listeners when the page is loaded
window.onload = () => {
    trendingAccesser()
    addEventListeners(loadMoreButton, searchSubmit, flixterTitle)
}