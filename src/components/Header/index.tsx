import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Box, Heading, Text } from "@chakra-ui/react";

const Title = () => (
	<>
		<Link to="/">
			<Heading
				fontWeight={700}
				fontSize="6xl"
				color="white"
				fontFamily="Montserrat Subrayada, sans-serif"
				as={motion.h1}
				initial={{ opacity: 0, y: -100 }}
				animate={{
					opacity: 1,
					y: 0,
					transition: {
						ease: "easeOut",
						duration: 0.9,
					},
				}}
			>
				Cinema
			</Heading>
		</Link>
		<Text
			letterSpacing={3}
			textTransform="uppercase"
			color="whitesmoke"
			as={motion.p}
			initial={{ opacity: 0, x: -200 }}
			animate={{
				opacity: 1,
				x: 0,
				transition: {
					ease: "easeOut",
					duration: 0.5,
					delay: 1,
				},
			}}
		>
			Your favourite movies.
		</Text>
	</>
);

export const Header = () => {
	const image =
		"https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";

	let { pathname } = useLocation();

	return (
		<>
			{pathname !== "/" ? (
				<Box
					width="100%"
					pb={3}
					px={8}
					mb={5}
					bgGradient="linear(to-l, #7928CA, #FF0080)"
				>
					<Title />
				</Box>
			) : (
				<Box
					width="100%"
					height="500px"
					bgImage={image}
					bgPosition="center"
					bgRepeat="no-repeat"
					bgSize="cover"
					bgColor="purple"
					bgBlendMode="overlay"
					mb={10}
					display="flex"
					flexDirection="column"
					justifyContent="center"
					paddingLeft={10}
				>
					<Title />
				</Box>
			)}
		</>
	);
};
