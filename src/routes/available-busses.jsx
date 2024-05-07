import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreenComponent/LoadingScreenComponent';
import CardComponent from "../components/CardsComponent/CardComponent";
import axios from 'axios';
import Swal from 'sweetalert2'
import NavBar from "../components/NavBarComponent";

const AvailableBusses = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (id) => {
    setIsLoading(true);
    const apiUrl = `http://127.0.0.1:8000/VDSTicketApp/bus/${id}/get_available_seats/`
    axios.get(apiUrl, {
      headers:{
        'Content-Type': 'application/json',
        // 'Authorization': 'Token ' + localStorage.getItem('authToken')
      }
    })
      .then(response => {
        setIsLoading(false);
        navigate("/available-seats", {state: response.data});
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

  const getFormattedDateTime = (dateTimeString) => {
    const [datePart, timePart] = dateTimeString.split('T');
    const [hours, minutes] = timePart.split(':').slice(0, 2);
    let formattedTime = `${(hours % 12) || 12}:${minutes}`;
    formattedTime += hours >= 12 ? ' PM' : ' AM';
    return <>Fecha: {datePart}<br/>Hora de salida: {formattedTime}</>
  };

  const getFormatedRoute = (route) => {
    switch (route) {
      case "C-J":
        return "Coatzacoalcos-Juárez"
      case "J-C":
        return "Juárez-Coatzacoalcos"
      case "S-C":
        return "Saltillo-Coatzacoalcos"
      case "C-S":
        return "Coatzacoalcos-SaLtillo"
      default: 
        return "Sin ruta"
    }
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className="cards-container">
        {state.map(bus => (
          <CardComponent
            title={bus.bus_name}
            content={<span>{getFormattedDateTime(bus.date)}<br/>{getFormatedRoute(bus.route)}</span>}
            onClick={() => handleClick(bus.id)}
          />
        ))}
      </div>
      {isLoading && <LoadingScreen />}
    </div>
  )
}

export default AvailableBusses;