import { Box, Heading, Text } from "@chakra-ui/react";
export const Header = () => {
  const image = "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";

  return (
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
      <Heading  fontWeight={700} fontSize="6xl" color="white" fontFamily="Montserrat Subrayada, sans-serif" as="h1">Cinema</Heading>
      <Text letterSpacing={3} textTransform="uppercase" color="whitesmoke">Your favourite movies.</Text>
    </Box>
  )
}
