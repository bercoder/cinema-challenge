import { useParams } from "react-router-dom";

import {
	Box,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from "@chakra-ui/react";

import { useMovie } from "../hooks/useMovie";
import { Detail } from "../components/Detail";

import { Layout } from "./Layout";
import { Loading } from "../components/Loading";

export const Movie = () => {
	const { id } = useParams();

	const { movie, loading, error } = useMovie(id ? +id : 0);

	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});

	return (
		<Layout>
			{loading && <Loading text="Loading movie..." />}

			{error && (
				<Box width="50%" marginInline="auto">
					<Alert status="error">
						<AlertIcon />
						<AlertTitle>Ooops!</AlertTitle>
						<AlertDescription>Movie could not be loaded.</AlertDescription>
					</Alert>
				</Box>
			)}

			<Detail movie={movie} />
		</Layout>
	);
};
