import React, { useState, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import {
	Box,
	Input,
	Text,
	Heading,
	InputGroup,
	InputLeftElement,
	CircularProgress,
} from "@chakra-ui/react";

import { Results } from "../Results";

import { useMovies } from "../../hooks/useMovies";
import { useDebounce } from "../../hooks/useDebounce";
import { Rating } from "../Rating";
import { scroll } from "../../utils";

export const Discover = () => {
	const [searching, setSearching] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const [ratingSelected, setRatingSelected] = useState<number>(0);
	const [heading, setHeading] = useState<string>("Most popular movies");

	const debouncedValue = useDebounce(search);

	const listOfMovies = useMovies({
		term: debouncedValue,
		page,
		minRating: ratingSelected === 0 ? null : ratingSelected * 2 - 2,
		maxRating: ratingSelected === 0 ? null : ratingSelected * 2,
	});

	useEffect(() => {
		setSearching(false);
		setPage(1);

		setHeading(
			!!debouncedValue.trim()
				? `Results for «${debouncedValue}»`
				: `Most popular movies`
		);
	}, [debouncedValue]);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
	}

	function changeRatingFilter(value: number) {
		setRatingSelected(value);
		setPage(1);
		scroll();
	}

	return (
		<>
			<Box id="discover">
				<Heading as="h2">🔥 Discover</Heading>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					gap="10px"
					flexDirection={{ base: 'column', md: 'row'}}
					my={8}
				>
					<InputGroup order={{ base: 1, md: -1}}>
						<InputLeftElement
							pointerEvents="none"
							children={<SearchIcon color="gray.300" />}
						/>
						<Input
							value={search}
							onChange={handleChange}
							type="search"
							placeholder="Search for a movie..."
						/>
					</InputGroup>
					{!debouncedValue &&
					<Rating
						title="Filter discoveries by rating:"
						rating={ratingSelected}
						onChange={changeRatingFilter}
						disabled={!!debouncedValue}
					/>}
				</Box>

				<Box
					mb={10}
					display="flex"
					alignItems="center"
					justifyContent="space-between"
				>
					{searching && (
						<Box display="flex" gap={2} alignItems="center">
							<CircularProgress size="30px" isIndeterminate color="red.300" />
							<Text color="gray.600" fontSize="sm">
								Searching...
							</Text>
						</Box>
					)}
				</Box>
			</Box>

			<Results
				changePage={(value) => setPage(value)}
				page={page}
				heading={heading}
				{...listOfMovies}
			/>
		</>
	);
};
