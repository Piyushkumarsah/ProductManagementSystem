import Navbar from './components/Navbar';
import Registerform from './components//Registerform'
import Login from './components//Login'
import Profile from './components//Profile'
import Products from './components/Products'
import Footer from './components/Footer'
import { BrowserRouter , Routes,Route,} from 'react-router-dom';
import './App.css';
import List from './components/List';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path='/register' element={<Registerform></Registerform>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/profile' element={<Profile></Profile>}/>
          <Route path='/products' element={<Products></Products>}/>
          <Route path='/list' element={<List></List>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
