import './App.css';
import Login_Restaurant from './Components/RegistrationRest/Login_Restaurant';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login_User from './Components/RegistrationUser/Login_User';
import Registration_Restaurant from './Components/RegistrationRest/Registration_Restaurant';
import Registration_User from './Components/RegistrationUser/Registration_User';
import User_Profile from './Components/RegistrationUser/User_Profile';
import Update_User_Profile from './Components/RegistrationUser/Update_User_Profile';
import Welcomepage_User from './Components/RegistrationUser/Welcomepage_User';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='' element={<Registration_Restaurant />} />
          <Route exact path='/loginRestaurant' element={<Login_Restaurant />} />
          <Route exact path='/userlogin' element={<Login_User />} />
          <Route exact path='/userregister' element={<Registration_User />} />
          <Route exact path='/userprofile' element={<User_Profile />} />
          <Route exact path='/updateuser' element={<Update_User_Profile />} />
          <Route exact path='/welcomeuser' element={<Welcomepage_User />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
