import { IMovie, IGenre } from "../../types";

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Flex,
	Box,
	Heading,
	Text,
	Tag,
	Image,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

import { Rating } from "../Rating";

type Props = {
	isOpen: boolean;
	onClose: VoidFunction;
	movie: IMovie;
	genres: {
		genres: IGenre[];
		loading: boolean;
		error: boolean;
	};
};

export const Detail: React.FC<Props> = ({
	isOpen,
	onClose,
	movie,
	genres: { genres, loading, error },
}) => {
	const {
		original_title,
		poster_path,
		release_date,
		genre_ids,
		overview,
		vote_average,
	} = movie;

	const getGenreName = (id: number) =>
		genres?.find((gen) => gen.id === id)?.name;

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{original_title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box>
							<Image
								boxSize="100%"
								height="300px"
								objectFit="cover"
								src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
								alt={`${original_title} poster`}
								rounded="md"
								fallbackSrc={`https://via.placeholder.com/500x750?text=${original_title
									?.split(" ")
									.join("+")}`}
							/>
							<Flex my={2} gap={2} alignItems="center" flexWrap="wrap">
								<Text fontSize="smaller" fontWeight="bold">
									Genres:
								</Text>
								{loading && <Text fontSize="smaller">Loading genres...</Text>}
								{!loading && error && (
									<Text color="red" fontSize="smaller">
										Error loading genres
									</Text>
								)}
								{!loading &&
									!error &&
									genre_ids?.map((el, index) => (
										<Tag key={index} colorScheme="red" fontSize="smaller">
											{getGenreName(el)}
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
						</Box>
						<Box>
							<Heading as="h2" fontSize="lg" my={3}>
								Synopsis
							</Heading>
							<Text fontSize="sm">{overview}</Text>
						</Box>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="red" mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
