import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login_Restaurant from './Components/RegistrationRest/Login_Restaurant';
import Registration_Restaurant from './Components/RegistrationRest/Registration_Restaurant';

import WelcomePage_Restaurant from './Components/RegistrationRest/WelcomePage_Restaurant';
import ViewProfile_Restaurant from './Components/RegistrationRest/ViewProfile_Restaurant';
import EditProfile_Restaurant from './Components/RegistrationRest/EditProfile_Restaurant';
import ForgotPassOTPRestaurant from './Components/ForgotPasswordRestaurant/ForgotPassOTPRestaurant';
import NewPasswordOTPRestaurant from './Components/ForgotPasswordRestaurant/NewPasswordOTPRestaurant';
import Restaurant_Add_table from './Components/Table_Restaurant/Restaurant_Add_table';
import Restaurant_View_table from './Components/Table_Restaurant/Restaurant_View_table';
import Restaurant_Edit_table from './Components/Table_Restaurant/Restaurant_Edit_table';
import Restaurant_Add_Food_Item from './Components/Food_Item_Restaurant/Restaurant_Add_Food_Item';
import Restaurant_View_Food_Item from './Components/Food_Item_Restaurant/Restaurant_View_Food_Item';

import Login_User from './Components/RegistrationUser/Login_User';
import Registration_User from './Components/RegistrationUser/Registration_User';
import User_Profile from './Components/RegistrationUser/User_Profile';
import Update_User_Profile from './Components/RegistrationUser/Update_User_Profile';
import Welcomepage_User from './Components/RegistrationUser/Welcomepage_User';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Registration_Restaurant />} />
          <Route exact path='/registrationRestaurant' element={<Registration_Restaurant />} />
          <Route exact path='/loginRestaurant' element={<Login_Restaurant />} />
          <Route exact path='/welcomeRestaurant' element={<WelcomePage_Restaurant />} />
          <Route exact path='/viewprofileRestaurant' element={<ViewProfile_Restaurant />} />
          <Route exact path='/editprofileRestaurant' element={<EditProfile_Restaurant />} />
          <Route exact path='/forgotpassotpRestaurant' element={<ForgotPassOTPRestaurant />} />
          <Route exact path='/newpasswordotpRestaurant' element={<NewPasswordOTPRestaurant />} />
          <Route exact path='/addtableRestaurant' element={<Restaurant_Add_table/>} />
          <Route exact path='/viewTableRestaurant' element={<Restaurant_View_table/>} />
          <Route exact path='/editTable/:tableId/' element={<Restaurant_Edit_table/>} />
          <Route exact path='/addfooditemRestaurant' element={<Restaurant_Add_Food_Item/>} />
          <Route exact path='/viewfooditemRestaurant' element={<Restaurant_View_Food_Item/>} />

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
