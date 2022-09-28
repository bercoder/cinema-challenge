import { IGenre } from '../types'
import { useState, useEffect } from 'react';

export const useGenres = () => {

  const [genres, setGenres] = useState<IGenre[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const KEY = `${process.env.REACT_APP_API_KEY}`;

    setLoading(true);
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`;
    (async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setGenres(data.genres)        
      } catch {
        setError(true)
      } finally {
        setLoading(false);
      }
    })()
  }, [])

  return {
    loading,
    error,
    genres,
  }
}