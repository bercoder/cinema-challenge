import { Discover } from './components/Discover';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Container } from '@chakra-ui/react'

import './App.css'

function App() {
  return (
    <>
    <Header />
    <Container maxWidth="container.lg">
      <Discover />
      <Footer />
    </Container>
    </>
  );
}

export default App;
