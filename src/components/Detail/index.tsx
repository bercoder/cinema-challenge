import { useState } from "react";
import { IMovie } from "../../types";

import {
	SimpleGrid,
	Flex,
	Show,
	Hide,
	Box,
	Heading,
	Text,
	Tag,
	Image,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

import { Rating } from "../Rating";
import { motion } from "framer-motion";

type Props = {
	movie: IMovie;
};

export const Detail: React.FC<Props> = ({ movie }) => {
	const [selected, setSelected] = useState<boolean>(false);

	const {
		original_title,
		poster_path,
		release_date,
		tagline,
		overview,
		vote_average,
		genres,
		credits,
	} = movie;

	const cast = credits?.cast ? credits.cast.slice(0, 10) : [];

	const imageStyle = {
		width: "auto",
		position: "absolute",
		zIndex: "100",
		top: "0",
		left: "50%",
	};

	const variants = {
		selected: { height: "100%", x: "-50%" },
		notselected: { height: "inherit", x: 0 },
	};

	return (
		<>
			<Box
				display="flex"
				flexDirection={{ base: "column", lg: "row" }}
				justifyContent="space-between"
			>
				<Hide above="lg">
					<Heading>{original_title}</Heading>
					<Text fontStyle="italic" my={2}>
						{tagline}
					</Text>
				</Hide>
				<Box
					width="100%"
					minWidth="40%"
					height={{ base: "400px", lg: "100vh" }}
				>
					<Image
						boxSize="100%"
						height="100%"
						objectFit="cover"
						src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
						alt={`${original_title} poster`}
						rounded="md"
						fallbackSrc={`https://via.placeholder.com/500x750?text=Loading`}
						sx={selected ? imageStyle : {}}
						as={motion.img}
						animate={selected ? "selected" : "notselected"}
						variants={variants}
						onClick={() => setSelected((prev) => !prev)}
						title={selected ? "Click to close" : "Click to expand"}
						cursor={selected ? "zoom-out" : "zoom-in"}
					/>
				</Box>
				<Box px={{ base: 0, sm: "5px", lg: "20px" }}>
					<Show above="lg">
						<Heading>{original_title}</Heading>
						<Text fontStyle="italic" my={2}>
							{tagline}
						</Text>
					</Show>
					<Flex my={2} gap={2} alignItems="center" flexWrap="wrap">
						<Text fontSize="smaller" fontWeight="bold">
							Genres:
						</Text>
						{genres?.map((el, index) => (
							<Tag key={index} colorScheme="red" fontSize="smaller">
								{el.name}
							</Tag>
						))}
					</Flex>
					<Flex gap={2} alignItems="center">
						<CalendarIcon />
						<Text fontSize="smaller" fontWeight="bold">
							Release date:{" "}
						</Text>
						<Text fontSize="smaller">{release_date}</Text>
					</Flex>
					<Flex gap={2} alignItems="center">
						<Text fontSize="smaller" fontWeight="bold">
							Vote average:
						</Text>
						<Rating
							title=""
							border={0}
							size={3}
							readOnly={true}
							rating={Math.floor(vote_average) / 2}
						/>
					</Flex>
					<Box>
						<Heading as="h2" fontSize="lg" my={3}>
							Synopsis
						</Heading>
						<Text fontSize="sm">{overview}</Text>
					</Box>
					<Box>
						<Heading fontSize="x-large" as="h2" my={3}>
							Cast
						</Heading>
						<SimpleGrid minH="150px" minChildWidth="100px" spacing="5px 10px">
							{cast?.map((item) => (
								<Box
									key={item.id}
									display="flex"
									flexDirection="column"
									alignItems="center"
								>
									<Image
										borderRadius="full"
										boxSize="70px"
										src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
										alt={item.name}
									/>
									<Text textAlign="center" fontWeight="bold" fontSize="sm">
										{item.name}
									</Text>
									<Text textAlign="center" fontSize="small">
										{item.character}
									</Text>
								</Box>
							))}
						</SimpleGrid>
					</Box>
				</Box>
			</Box>
		</>
	);
};
