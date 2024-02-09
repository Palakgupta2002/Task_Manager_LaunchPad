
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';

function App() {
  return (
    <div className="">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignUp/>} />
      <Route path='/signIn' element={<SignIn/>}/>
      <Route path='/Home' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
