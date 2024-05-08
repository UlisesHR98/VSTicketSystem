import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/HeaderComponent/HeaderComponent';
import LoadingScreen from '../components/LoadingScreenComponent/LoadingScreenComponent';
import CardComponent from "../components/CardsComponent/CardComponent";
import axios from 'axios';
import Swal from 'sweetalert2'

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
        'Authorization': 'Token ' + localStorage.getItem('authToken')
      }
    })
      .then(response => {
        setIsLoading(false);
        navigate("/available-seats", {state: response.data});
      })
      .catch(error => {
        setIsLoading(false);
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          iconColor: "#1ccda0",
          confirmButtonColor: "#0da290",
        })
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
      <Header title="Salidas disponibles" useBackButton='true' />
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