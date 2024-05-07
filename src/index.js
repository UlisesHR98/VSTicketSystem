import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Departure from './routes/departure-searcher'
import Client from './routes/search-client'
import Seller from './routes/seller-view';
import BusForm from './routes/create-buss';
import AvailableBusses from './routes/available-busses';
import reportWebVitals from './reportWebVitals';
import SeatSelector from './routes/available-seats';
import CustomerSearcher from './routes/customer-searcher';
import Login from './routes/login';
import Menu from './routes/menu';
import ManagerView from './routes/manager-view';
import MoneyView from './routes/money-view';
import Reports from './routes/reports';
import Diagrams from './routes/diagrams';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App/>}/>
        <Route exact path="/departure-searcher" element={<Departure/>}/>
        <Route exact path="/search-client" element={<Client/>}/>
        <Route exact path="/seller-view" element={<Seller/>}/>
        <Route exact path="/available-busses" element={<AvailableBusses/>}/>
        <Route exact path="/create-bus" element={<BusForm/>}/>
        <Route exact path="/available-seats" element={<SeatSelector/>}/>
        <Route exact path="/customer-searcher" element={<CustomerSearcher/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/menu" element={<Menu/>}/>
        <Route exact path='/manager-view' element={<ManagerView/>}/>
        <Route exact path='/money-view' element={<MoneyView/>}/>
        <Route exact path='/reports' element={<Reports/>}/>
        <Route exact path='/diagrams' element={<Diagrams/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
