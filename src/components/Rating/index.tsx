import { FC, useState, useEffect } from "react";
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

type Props = {
	title?: string;
	rating?: number;
	readOnly?: boolean;
	size?: number;
	border?: number;
	onChange?: (value: number) => void;
	disabled?: boolean;
};

export const Rating: FC<Props> = ({
	title = "Rating: ",
	rating = 5,
	border = 1,
	readOnly = false,
	onChange,
	size = 6,
	disabled = false
}) => {
	const [stars, setStars] = useState<number[]>([]);

	useEffect(() => {
		setStars(Array(5).fill(0).fill(1, 0, rating));
	}, [rating]);

	function handleClick(index: number) {
		if (!readOnly && onChange) {
			onChange(index === rating - 1 ? 0 : index + 1);
		}
	}

	return (
		<Box my={1} gap={{ base: '2px', sm: '10px'}} 
		display="flex" alignItems="center" flexDirection={{ base: 'column', sm: 'row'}} opacity={!!disabled ? 0.5 : 1}>
			<Text fontSize="small" whiteSpace="nowrap">{title}</Text>
			<HStack
				w="min-content"
				border={`${border}px`}
				borderColor="gray.200"
				p={2}
				borderRadius="md"
				className="star-rating"
			>
				{stars.map((star, index) => (
					<IconButton
						cursor={!!disabled ? 'initial' : 'pointer'}
						padding={0}
						minW={size < 4 ? size * 1.9 : "35px"}
						onClick={() => handleClick(index)}
						key={index}
						title={index === rating - 1 ? `Disable ${(index * 2)} - ${(index * 2 + 2)} filter` : `Set ${(index * 2)} - ${(index * 2 + 2)} stars`}
						onMouseEnter={(e) => {
							if (!!readOnly || !!disabled) return;
							const all = e.currentTarget.parentElement?.children;
							if (all) {
								const buttons = Array.from(all).splice(0, index + 1);
								for (const el of buttons) {
									const obj = el.querySelector("svg");
									if (obj) obj.style.color = "var(--chakra-colors-red-400)";
								}
							}
						}}
						onMouseLeave={(e) => {
							if (!!readOnly || !!disabled) return;
							const all = e.currentTarget.parentElement?.children;
							if (all) {
								const buttons = Array.from(all);

								for (const el of buttons) {
									const obj = el.querySelector("svg");
									if (obj)
										obj.style.color = !!stars[buttons.indexOf(el)]
											? "var(--chakra-colors-red-500)"
											: "var(--chakra-colors-gray-200)";
								}
							}
						}}
						aria-label="rate film"
						variant="link"
						icon={
							<StarIcon
								color={!!star ? "red.500" : "gray.200"}
								boxSize={size}
							/>
						}
					/>
				))}
			</HStack>
		</Box>
	);
};
