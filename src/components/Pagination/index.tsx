import { FC } from "react";
import { HStack, Button, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { IPagination } from "../../types";

import { scroll } from '../../utils';

type Props = {
  page: number;
  changePage: (value: number) => void;
	data: IPagination;
}

export const Pagination: FC<Props> = ({ page, changePage, data: { total, results} }) => {

	function handlePrev() {
		changePage(Math.max(1, page - 1));
		scroll();
	}

	function handleNext() {
		changePage(Math.min(total, page + 1));
		scroll();
	}

	return (
		<HStack spacing={4} justifyContent="center" my={8}>
			<Button
				onClick={handlePrev}
				leftIcon={<ArrowBackIcon />}
				colorScheme="gray"
				variant="solid"
				disabled={page - 1 < 1}
				title="Go to previous page"
			>
				Prev
			</Button>
			<HStack>
				<Text fontWeight="bold" align="center">{page.toLocaleString()}</Text>
				<Text color="gray.400">of</Text>
				<Text fontWeight="bold" align="center">{results.toLocaleString()}</Text>
			</HStack>
			<Button
				onClick={handleNext}
				rightIcon={<ArrowForwardIcon />}
				colorScheme="gray"
				variant="solid"
				disabled={page + 1 > total}
				title="Go to next page"
			>
				Next
			</Button>
		</HStack>
	);
};
