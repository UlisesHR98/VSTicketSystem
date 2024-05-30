import React, { useState } from 'react';
import './departure-searcher.css';
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreenComponent/LoadingScreenComponent';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBarComponent";


const Departure = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    travelDate: '',
    numberOfTickets: 1,
    desiredRoute: '',
  });

  const apiUrl = 'http://127.0.0.1:8000/VDSTicketApp/bus/';

  const fetchDataOnClick = async () =>{
    if (!searchParams.travelDate || !searchParams.numberOfTickets || !searchParams.desiredRoute){
      Swal.fire({
        title: "Error al buscar",
        text: "Por favor, llene todos los campos del formulario antes de continuar",
        icon: "error",
        iconColor: "#1ccda0",
        confirmButtonColor: "#0da290",
      })
      return;
    }
    setIsLoading(true);
    axios.get(apiUrl, {
      headers:{
        'Content-Type': 'application/json',
      },
      params:{
        travel_date:searchParams.travelDate,
        requested_seats:searchParams.numberOfTickets,
        requested_route:searchParams.desiredRoute,
        
      }})
    .then(response => {
      setIsLoading(false);
      navigate("/available-busses",{state: response.data});
    })
    .catch(error => {
      if (error.response.status === 401) {
        Swal.fire({
          title: "Sesión Expirada",
          text: "La sesión ha expirado. Inicie sesión nuevamente.",
          icon: "error",
          iconColor: "#1ccda0",
          confirmButtonColor: "#0da290",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/Login");
          }
        });
      } else {
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          iconColor: "#1ccda0",
          confirmButtonColor: "#0da290",
        });
      }
      setIsLoading(false);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevParams => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <div>
      <NavBar></NavBar>
      <form className="departureSearchForm">
        <div className="formGroup">
          <label htmlFor="travelDate">Fecha de Viaje:</label>
          <input
            type="date"
            id="travelDate"
            name="travelDate"
            value={searchParams.travelDate}
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="numberOfTickets">Número de Tickets:</label>
          <input
            type="number"
            id="numberOfTickets"
            name="numberOfTickets"
            value={searchParams.numberOfTickets}
            min="1"
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="desiredRoute">Ruta Deseada:</label>
          <select id="desiredRoute" name="desiredRoute" value={searchParams.desiredRoute} onChange={handleChange}>
            <option value=""></option>
            <option value="J-C">Juárez-Coatzacoalcos</option>
            <option value="C-J">Coatzacoalcos-Juárez</option>
            <option value="S-C">Saltillo-Coatzacoalcos</option>
            <option value="C-S">Coatzacoalcos-Saltillo</option>
          </select>
        </div>
        <button type="button" onClick={fetchDataOnClick}>Buscar Tickets</button>
      </form>
      {isLoading && <LoadingScreen/>}
       
    </div>
  );
};

export default Departure;