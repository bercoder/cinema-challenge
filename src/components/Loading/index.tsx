import {
	CircularProgress,
  SimpleGrid,
  Text,
	Box,
} from "@chakra-ui/react";

export const Loading = ({ text }: { text: string }) => {
  return (
    <SimpleGrid my={5} placeItems="center">
      <Box display="flex" gap={2} alignItems="center">
        <CircularProgress size="30px" isIndeterminate color="red.300" />
        <Text color="gray.600" fontSize="sm">
          {text}
        </Text>
      </Box>
    </SimpleGrid>
  );
}