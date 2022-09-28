import { IMovie, IPagination } from "../../types";

import { useGenres } from "../../hooks/useGenres";

import { FC, useState, useEffect } from "react";
import {
	SimpleGrid,
	Box,
	Heading,
	Text,
	CircularProgress,
	useDisclosure,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from "@chakra-ui/react";

import { Thumbnail } from "../Thumbnail";
import { Detail } from "../Detail";
import { Pagination } from "../Pagination";

type Props = {
	loading: boolean;
	error: boolean;
	movies: IMovie[];
	pagination: IPagination;
	heading: string;
	page: number;
	changePage: (value: number) => void;
};

export const Results: FC<Props> = ({
	loading,
	error,
	movies,
	pagination,
	heading,
	page,
	changePage,
}) => {
	const [movieSelected, setMovieSelected] = useState<IMovie>({} as IMovie);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const genres = useGenres();

	useEffect(() => {
		if (!movieSelected?.id) return;
		onOpen();
	}, [movieSelected, onOpen]);

	function closeModal() {
		setMovieSelected({} as IMovie);
		onClose();
	}

	if (error) {
		return (
			<Box width="50%" marginInline="auto">
				<Alert status="error">
					<AlertIcon />
					<AlertTitle>Ooops!</AlertTitle>
					<AlertDescription>Movies could not be loaded.</AlertDescription>
				</Alert>
			</Box>
		);
	}

	if (loading) {
		return (
			<SimpleGrid my={5} placeItems="center">
				<Box display="flex" gap={2} alignItems="center">
					<CircularProgress size="30px" isIndeterminate color="red.300" />
					<Text color="gray.600" fontSize="sm">
						Loading movies...
					</Text>
				</Box>
			</SimpleGrid>
		);
	}

	if (!loading && !movies.length)
		return (
			<Box width="50%" marginInline="auto">
				<Alert status="warning">
					<AlertIcon />
					<AlertDescription>No results.</AlertDescription>
				</Alert>
			</Box>
		);

	return (
		<>
			<Heading
				as="h2"
				fontSize="xl"
				pb={1}
				borderBottom="1px solid lightgray"
				mb={5}
			>
				{heading}
			</Heading>

			<Box>
				<SimpleGrid minH="500px" className="movies" minChildWidth="200px" spacing="20px">
					{movies.map((movie, index) => (
						<Thumbnail
							key={movie.id}
							poster={movie.poster_path}
							title={movie.title}
							onclick={() => setMovieSelected(movie)}
							total={movies.length}
							n={(page - 1) * 20 + index + 1}
						/>
					))}
				</SimpleGrid>
				<Pagination data={pagination} page={page} changePage={changePage} />
			</Box>

			<Detail
				genres={genres}
				movie={movieSelected}
				isOpen={isOpen}
				onClose={closeModal}
			/>
		</>
	);
};
