import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
import Restaurant_Edit_Food_item from './Components/Food_Item_Restaurant/Restaurant_Edit_Food_item';
import Restaurant_Edit_Food_item_Image from './Components/Food_Item_Restaurant/Restaurant_Edit_Food_item_Image';


import Login_User from './Components/RegistrationUser/Login_User';
import Registration_User from './Components/RegistrationUser/Registration_User';
import User_Profile from './Components/RegistrationUser/User_Profile';
import Update_User_Profile from './Components/RegistrationUser/Update_User_Profile';
import Welcomepage_User from './Components/RegistrationUser/Welcomepage_User';
import Restaurant_View from './Components/User_Restaurant/Restaurant_View';
import User_Address from './Components/RegistrationUser/User_Address';
import Restaurant_Menu from './Components/User_Restaurant/Restaurant_Menu';
import Restaurant_Table from './Components/User_Restaurant/Restaurant_Table';
import Restaurant_Cart from './Components/User_Restaurant/Restaurant_Cart';
import ForgotPassOTPUser from './Components/ForgotPasswordUser/ForgotPassOTPUser';
import NewPasswordOTPUser from './Components/ForgotPasswordUser/NewPasswordOTPUser';
import User_Notifications from './Components/User_Restaurant/User_Notifications';
import User_Navbar from './Components/CommonLayouts/User_Navbar';
import About_us from './Components/User_Restaurant/About_us';
import User_order_Details from './Components/User_Restaurant/User_order_Details';
import User_Booking_Details from './Components/User_Restaurant/User_Booking_Details';


import Restaurant_View_order from './Components/Order_Restaurant/Restaurant_View_order';
import Login_Driver from './Components/LoginDriver/Login_Driver';
import Login_Admin from './Components/AdminLogin/Login_Admin';
import WelcomePage_Admin from './Components/AdminLogin/WelcomePage_Admin';
import Add_Driver_Admin from './Components/DriverAdmin/Add_Driver_Admin';
import View_Driver_Admin from './Components/DriverAdmin/View_Driver_Admin';
import Edit_Driver_Admin from './Components/DriverAdmin/Edit_Driver_Admin';
import View_Restaurant_Admin from './Components/Restaurant_Admin/View_Restaurant_Admin';
import Add_City_Admin from './Components/City_Admin/Add_City_Admin';
import View_City_Admin from './Components/City_Admin/View_City_Admin';
import Edit_City_Admin from './Components/City_Admin/Edit_City_Admin';
import WelcomePage_Driver from './Components/LoginDriver/WelcomePage_Driver';
import View_Restaurant_Driver from './Components/LoginDriver/View_Restaurant_Driver';
import ViewProfile_Driver from './Components/LoginDriver/ViewProfile_Driver';
import Restaurant_Booking_Details from './Components/Table_Restaurant/Restaurant_Booking_Details';
import View_Order_Driver from './Components/LoginDriver/View_Order_Driver';
import ForgotPassOTPDriver from './Components/ForgotPasswordDriver/ForgotPassOTPDriver';
import NewPasswordOTPDriver from './Components/ForgotPasswordDriver/NewPasswordOTPDriver';
import View_My_Past_Order_Driver from './Components/LoginDriver/View_My_Past_Order_Driver';
import View_Restaurant_Rating from './Components/Restaurant_Rating/View_Restaurant_Rating';
import Restaurant_View_Completed_order from './Components/Order_Restaurant/Restaurant_View_Completed_order';
import Restaurant_View_Cancelled_order from './Components/Order_Restaurant/Restaurant_View_Cancelled_order';
import ViewEarningRestaurant from './Components/EarningRestaurant/ViewEarningRestaurant';
import ViewEarningDriver from './Components/EarningDriver/ViewEarningDriver';
import ViewTotalEarningAdmin from './Components/Restaurant_Admin/ViewTotalEarningAdmin';
import ViewPaymentRestaurant from './Components/EarningRestaurant/ViewPaymentRestaurant';

function App() {
  const token = localStorage.getItem('token')
  const [tokendt, settokendt] = useState({
    token
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.post('http://localhost:5000/restaurant/checktoken', tokendt);
        console.log(res);
        if (res.data.tokensts === 1) {
          localStorage.removeItem('token')
        }
      } catch (error) {
        console.error(error);
      }
    }
    checkToken()
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Restaurant */}
          <Route exact path='/' element={<Registration_Restaurant />} />
          <Route exact path='/registrationRestaurant' element={<Registration_Restaurant />} />
          <Route exact path='/loginRestaurant' element={<Login_Restaurant />} />
          <Route exact path='/welcomeRestaurant' element={<WelcomePage_Restaurant />} />
          <Route exact path='/viewprofileRestaurant' element={<ViewProfile_Restaurant />} />
          <Route exact path='/editprofileRestaurant' element={<EditProfile_Restaurant />} />
          <Route exact path='/forgotpassotpRestaurant' element={<ForgotPassOTPRestaurant />} />
          <Route exact path='/newpasswordotpRestaurant' element={<NewPasswordOTPRestaurant />} />
          <Route exact path='/addtableRestaurant' element={<Restaurant_Add_table />} />
          <Route exact path='/viewTableRestaurant' element={<Restaurant_View_table />} />
          <Route exact path="/bookingDetailsRestaurant/:tableId" element={<Restaurant_Booking_Details />} />
          <Route exact path='/editTable/:tableId/' element={<Restaurant_Edit_table />} />
          <Route exact path='/addfooditemRestaurant' element={<Restaurant_Add_Food_Item />} />
          <Route exact path='/viewfooditemRestaurant' element={<Restaurant_View_Food_Item />} />
          <Route exact path='/editmenu/:itemid/' element={<Restaurant_Edit_Food_item />} />
          <Route exact path='/editmenuimage/:itemid/' element={<Restaurant_Edit_Food_item_Image />} />
          <Route exact path='/vieworderRestaurant' element={<Restaurant_View_order />} />
          <Route exact path='/viewCompletedorderRestaurant' element={<Restaurant_View_Completed_order />} />
          <Route exact path='/viewCancelledorderRestaurant' element={<Restaurant_View_Cancelled_order />} />
          <Route exact path='/viewRatingRestaurant' element={<View_Restaurant_Rating />} />
          <Route exact path='/viewEarningRestaurant' element={<ViewEarningRestaurant />} />
          <Route exact path='/viewPaymentRestaurant' element={<ViewPaymentRestaurant />} />

          {/* User */}
          <Route exact path='/usernavbar' element={<User_Navbar />} />
          <Route exact path='/userlogin' element={<Login_User />} />
          <Route exact path='/userregister' element={<Registration_User />} />
          <Route exact path='/userprofile' element={<User_Profile />} />
          <Route exact path='/updateuser' element={<Update_User_Profile />} />
          <Route exact path='/welcomeuser' element={<Welcomepage_User />} />
          <Route exact path='/viewrestaurantuser' element={<Restaurant_View />} />
          <Route exact path='/useraddress' element={<User_Address />} />
          <Route exact path='/Restaurantmenuuser/:rid' element={<Restaurant_Menu />} />
          <Route exact path='/Restauranttableuser/:tid' element={<Restaurant_Table />} />
          <Route exact path='/cart' element={<Restaurant_Cart />} />
          <Route exact path='/forgotPassOTPUser' element={<ForgotPassOTPUser />} />
          <Route exact path='/newPasswordOTPUser' element={<NewPasswordOTPUser />} />
          <Route exact path='/usernotify' element={<User_Notifications/>} />
          <Route exact path='/aboutus' element={<About_us/>} />
          <Route exact path='/userorder' element={<User_order_Details/>} />
          <Route exact path='/userbooking' element={<User_Booking_Details/>} />

          {/* Driver */}
          <Route exact path='/loginDriver' element={<Login_Driver />} />
          <Route exact path='/forgotpassotpDriver' element={<ForgotPassOTPDriver />} />
          <Route exact path='/newpasswordotpDriver' element={<NewPasswordOTPDriver />} />
          <Route exact path='/welcomedriver' element={<WelcomePage_Driver />} />
          <Route exact path='/viewRestaurantdriver' element={<View_Restaurant_Driver />} />
          <Route exact path='/viewprofileDriver' element={<ViewProfile_Driver />} />
          <Route exact path='/viewMyPastOrderDriver' element={<View_My_Past_Order_Driver />} />
          <Route exact path='/vieworderDriver/:restaurantId/' element={<View_Order_Driver />} />
          <Route exact path='/viewEarningDriver' element={<ViewEarningDriver />} />

          {/* Admin */}
          <Route exact path='/loginAdmin' element={<Login_Admin />} />
          <Route exact path='/welcomeAdmin' element={<WelcomePage_Admin />} />
          <Route exact path='/addDriverAdmin' element={<Add_Driver_Admin />} />
          <Route exact path='/viewDriverAdmin' element={<View_Driver_Admin />} />
          <Route exact path='/editDriver/:driverId/' element={<Edit_Driver_Admin />} />
          <Route exact path='/viewRestaurantAdmin' element={<View_Restaurant_Admin />} />
          <Route exact path='/addCityAdmin' element={<Add_City_Admin />} />
          <Route exact path='/viewCityAdmin' element={<View_City_Admin />} />
          <Route exact path='/editCity/:cityId/' element={<Edit_City_Admin />} />
          <Route exact path='/viewTotalAmountAdmin/:restaurantId/' element={<ViewTotalEarningAdmin />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
