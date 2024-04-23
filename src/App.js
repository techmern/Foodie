import logo from './logo.svg';
import './App.css';
import Login_Restaurant from './Components/RegistrationRest/Login_Restaurant';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='' element={<Login_Restaurant />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
