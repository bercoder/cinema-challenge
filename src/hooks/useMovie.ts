import { IMovie } from "../types";
import { useState, useEffect } from "react";

export const useMovie = ( id: number) => {

	const KEY = `${process.env.REACT_APP_API_KEY}`;

	const [movie, setMovie] = useState<IMovie>({} as IMovie);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);

	const BASE_URL = "https://api.themoviedb.org/3";
	
	useEffect(() => {

		if (!id) return;

		const URL = `${BASE_URL}/movie/${id}?api_key=${KEY}&language=en-US&append_to_response=credits`;

		(async () => {
			setLoading(true);
			try {
				const res = await fetch(URL);
				const data = await res.json();
				setMovie(data);
			} catch {
				setError(true);
			} finally {
				setLoading(false);
			}
		})();
	}, [id, KEY]);

	return {
		loading,
		error,
		movie
  };
};
