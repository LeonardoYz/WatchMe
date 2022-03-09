import { useEffect, useState } from "react"
import { api } from "./services/api";
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then(response => {
        setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <div style={{ display: 'flex' }}>
      <SideBar 
        selectedGenreId={selectedGenreId} 
        setSelectedGenreId={setSelectedGenreId}
      />
      <Content 
        selectedGenre={selectedGenre} 
        selectedGenreId={selectedGenreId}
      />
    </div>
  )
}