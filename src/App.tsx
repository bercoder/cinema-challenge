import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css'

import { Home } from './Pages/Home';
import { Movie } from './Pages/Movie';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Movie />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
