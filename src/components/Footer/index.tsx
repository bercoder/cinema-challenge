import { useEffect, useState } from "react";
import { Box, Link, IconButton } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { ArrowUpIcon } from "@chakra-ui/icons";

export const Footer = () => {
  const [up, setUp] = useState<boolean>(false);

  function scroll() {
    if (window.scrollY > 800) {
      if (!up) setUp(true)
    } else {
      if(up) setUp(false)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scroll, false);
  
    return () => document.removeEventListener('scroll', scroll, false);

  })
	return (
		<>
			<Box
				borderTop="1px solid lightgray"
				as="footer"
				mt="40px"
				h="30px"
				display="flex"
				justifyContent="center"
				alignItems="flex-end"
			>
				<Link fontSize="sm" href="https://github.com/bercoder/cinema-challenge" isExternal>
					Coded by https://github.com/bercoder <ExternalLinkIcon mx="2px" />
				</Link>
			</Box>
      {up && <IconButton
        position="fixed"
        right="20px"
        bottom="32px"
        colorScheme='red'
        size='sm'
        variant='outline'
        opacity={0.5}
        _hover={{
          opacity: 1
        }}
        title="Go top"
        aria-label="go top" icon={<ArrowUpIcon />} 
        onClick={() => window.scroll({
					top: 0,
					behavior: 'smooth'
				})}/>}
		</>
	);
};
