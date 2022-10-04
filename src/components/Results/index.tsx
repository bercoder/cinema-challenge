import { FC } from "react";
import { IMovie, IPagination } from "../../types";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
	SimpleGrid,
	Box,
	Heading,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from "@chakra-ui/react";

import { Thumbnail } from "../Thumbnail";
import { Pagination } from "../Pagination";
import { Loading } from "../Loading";

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
		return <Loading text="Loading movies..." />;
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
				<SimpleGrid
					minH="500px"
					className="movies"
					minChildWidth="200px"
					spacing="20px"
					as={motion.div}
				>
					{movies.map((movie, index) => (
						<Link
							key={movie.id}
							to={String(movie.id)}
							style={
								index === 0 && movies.length > 2 ? { gridArea: "1/1/3/3" } : {}
							}
						>
							<Thumbnail
								poster={movie.poster_path}
								title={movie.title}
								n={(page - 1) * 20 + index + 1}
							/>
						</Link>
					))}
				</SimpleGrid>
				<Pagination data={pagination} page={page} changePage={changePage} />
			</Box>
		</>
	);
};
