import { useState, useEffect } from 'react';

import { MovieCard } from './MovieCard';
import { Header } from './Header';

import '../styles/content.scss';

import { api } from '../services/api';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content({state}) {
  
  const [movies, setMovies] = useState<MovieProps[]>([]);
  
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${state.selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [state.selectedGenreId]); 

  return (
    <div className="container">

      <Header state={state} /> 
      
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
      
    </div>
  )
}