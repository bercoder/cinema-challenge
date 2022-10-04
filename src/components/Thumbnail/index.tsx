import React from "react";

import { VStack, Image, Box, Heading, Text } from "@chakra-ui/react";

type Props = {
	n: number;
	title?: string;
	poster: string;
};

export const Thumbnail: React.FC<Props> = ({ n, title, poster }) => {
	return (
		<VStack as="article" cursor="pointer">
			<Box
				role="group"
				overflow="hidden"
				position="relative"
				height="100%"
				width="100%"
			>
				<Image
					boxSize="100%"
					objectFit="cover"
					src={`https://image.tmdb.org/t/p/w500/${poster}`}
					alt={`${title} poster`}
					rounded="md"
					fallbackSrc={`https://via.placeholder.com/500x750?text=${title
						?.split(" ")
						.join("+")}`}
				/>
				<Text
					fontSize="4em"
					fontWeight="bold"
					textShadow="1px 1px 2px white, 0 0 1em red, 0 1px 0.2em red"
					color="transparent"
					position="absolute"
					left={2}
					opacity=".7"
					bottom={0}
				>
					{n}
				</Text>
				<Heading
					bg="#ffffff5c"
					color="white"
					textShadow="0 0 20px black"
					width="100%"
					position="absolute"
					textAlign="center"
					as="h4"
					fontSize="lg"
					p={2}
					_groupHover={{
						transition: "transform .3s ease",
						transform: "translateY(-100%)",
					}}
				>
					{title}
				</Heading>
			</Box>
		</VStack>
	);
};
