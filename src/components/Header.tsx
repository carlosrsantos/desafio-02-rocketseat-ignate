import { useState, useEffect } from 'react';

import { api } from '../services/api';

import '../styles/content.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function Header({state}){
 
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    
    api.get<GenreResponseProps>(`genres/${state.selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
    
  }, [state.selectedGenreId]);

  return (
    <header>
          <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
    </header> 
  )
}