import logo from './logo.svg';
import './App.css';
import Login_Restaurant from './Components/RegistrationRest/Login_Restaurant';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login_User from './Components/RegistrationUser/Login_User';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='' element={<Login_Restaurant />} />
          <Route exact path='/userlogin' element={<Login_User />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
