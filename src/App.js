import logo from './logo.svg';
import './App.css';
import Login_Restaurant from './Components/RegistrationRest/Login_Restaurant';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login_User from './Components/RegistrationUser/Login_User';
import Registration_Restaurant from './Components/RegistrationRest/Registration_Restaurant';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='' element={<Registration_Restaurant />} />
          <Route exact path='/loginRestaurant' element={<Login_Restaurant />} />
          <Route exact path='/userlogin' element={<Login_User />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
