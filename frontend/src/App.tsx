
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home'
import About from './components/About/About'
import PokemonPage from './components/pokemon_parts/PokemonPage'
import Navbar from './components/Navbar';
import Ability from './components/pokemon_parts/Ability';
import Type from './components/pokemon_parts/Type';
import Move from './components/pokemon_parts/Move';


function App() {

  return (
    <Router>
      <div><Navbar /></div>
      <div id='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/pokemon/:name' element={<PokemonPage />} />
          <Route path='/ability/:name' element={<Ability />} />
          <Route path='/type/:name' element={<Type />} />
          <Route path='/move/:name' element={<Move />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;