
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 

import Home from './components/Home'
import About from './components/About'
import PokemonPage from './components/pokemon_parts/PokemonPage'
import Navbar from './components/Navbar';
import Ability from './components/pokemon_parts/Ability';


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
        </Routes>
      </div>
    </Router>
  );
}

export default App;