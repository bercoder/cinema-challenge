import { Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
			}}
			transition={{
				duration: 0.4,
			}}
		>
			<Header />
			<Container maxWidth="container.lg">
				{children}
				<Footer />
			</Container>
		</motion.div>
	);
};
