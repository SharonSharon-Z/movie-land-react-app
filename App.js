import {useEffect, useState} from "react";
import MovieCard from "./MovieCard";
import "./App.css"
import searchIcon from "./search.svg"


const OMDb_API = "http://www.omdbapi.com/?apikey=b7a7d199";

// const movie1 = {
//     "Title": "Italian Spiderman",
//     "Year": "2007",
//     "imdbID": "tt2705436",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg"
// }

const App = function() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([])

    const searchMovies = async function(title){
        const res = await fetch(`${OMDb_API}&s=${title}`)
        const data = await res.json();
        // console.log(data.Search);
        setMovies(data.Search);
        // console.log(movies[0]);
    }

    useEffect(function(){
        searchMovies("Spiderman")
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input 
                    placeholder="Search for movies" 
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}>
                </input>
                <img
                    src={searchIcon} 
                    alt="search"
                    onClick={()=> searchMovies(searchTerm)}>
                </img>
            </div>
            
            {
                movies?.length > 0
                    ?   (
                        <div className="container">
                            {
                              movies.map((eachMovie) => {
                                return <MovieCard movie = {eachMovie}/>
                              })  
                            }
                            {/* <MovieCard movie1 = {movie1}/> */}
                        </div>
                    ):  ( 
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }
        </div>
    )
}

export default App 