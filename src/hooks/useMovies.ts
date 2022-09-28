import { IMovie, IPagination } from "../types";
import { useState, useEffect } from "react";

type Props = {
	term: string;
	page: number;
	minRating?: number | null;
	maxRating?: number | null;
};

export const useMovies = ({
	term,
	page,
	minRating = null,
	maxRating = null,
}: Props) => {

	const KEY = `${process.env.REACT_APP_API_KEY}`;

	const [searched, setSearched] = useState<IMovie[]>([]);
	const [results, setResults] = useState<IMovie[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [pagination, setPagination] = useState<IPagination>({
		total: 0,
		results: 0,
	});

	const BASE_URL = "https://api.themoviedb.org/3";
	
	useEffect(() => {

		const URL = minRating === null && maxRating === null
				? `${BASE_URL}/discover/movie?api_key=${KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_watch_monetization_types=flatrate`
				: `${BASE_URL}/discover/movie?api_key=${KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_watch_monetization_types=flatrate&vote_average.gte=${minRating}.0&vote_average.lte=${maxRating}.0`;

		(async () => {
			setLoading(true);
			try {
				const res = await fetch(URL);
				const data = await res.json();
				setResults(data.results);
				setPagination({
					total: data.total_pages,
					results: data.total_results,
				});
			} catch {
				setError(true);
			} finally {
				setLoading(false);
			}
		})();
	}, [page, minRating, maxRating, KEY]);

	useEffect(() => {
		if (!term.trim()) {
			setSearched([]);
			return;
		}

		const URL = `${BASE_URL}/search/movie?api_key=${KEY}&language=en-US&page=${page}&include_adult=false&query=${term}`;

		(async () => {
			setLoading(true);
			try {
				const res = await fetch(URL);
				const data = await res.json();
				setSearched(data.results);
        setPagination({
          total: data.total_pages,
          results: data.total_results
        });        
			} catch {
				setError(true);
			} finally {
				setLoading(false);
			}
		})();
	}, [term, page, KEY]);

	return {
		loading,
		error,
		movies: term.trim() ? searched : results,
		searched,
    pagination
	};
};
