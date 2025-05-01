
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 

import Home from './components/Home'
import About from './components/About'
import PokemonPage from './components/PokemonPage'


function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/pokemon/:name' element={<PokemonPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;