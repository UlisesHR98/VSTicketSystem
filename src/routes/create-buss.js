import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos por defecto
import './create-buss.css';
import axios from 'axios';
import Header from '../components/HeaderComponent/HeaderComponent';
import LoadingScreen from '../components/LoadingScreenComponent/LoadingScreenComponent';
import Swal from 'sweetalert2';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

const BusForm = () => {
    const [busName, setBusName] = useState('');
    const [tripDate, setTripDate] = useState(new Date());
    const [seatNumber, setSeatNumber] = useState(52);
    const [route, setRoute] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [tripTime, setTripTime] = useState('');

    const formatDateForBackend = (date) => {
        const year = date.getFullYear();
        // getMonth() devuelve un índice basado en cero, así que suma 1 para obtener el mes correcto
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = tripTime.hour()
        const minutes = tripTime.minute();
      
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formattedDate = formatDateForBackend(tripDate);
        axios.post('http://127.0.0.1:8000/VDSTicketApp/bus/',{
            bus_name: busName,
            date: formattedDate,
            seats: seatNumber,
            route: route,
        },{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + localStorage.getItem('authToken')
            }
          }).then(response => {
            setIsLoading(false);
            Swal.fire({
                title: "Autobus creado",
                text: `Autobús "${busName}" creado con éxito. Fecha: ${formattedDate}, Asientos: ${seatNumber}, Ruta: ${route}`,
                icon: "success",
                iconColor: "#1ccda0",
                confirmButtonColor: "#0da290",
            });
            setBusName('');
            setTripDate(new Date());
            setTripTime('');
            setSeatNumber(52);
            setRoute('');
          })
          .catch(error => {
            setIsLoading(false);
            Swal.fire({
                title: "Error",
                text: error.response.data.message,
                icon: "error",
                iconColor: "#1ccda0",
                confirmButtonColor: "#0da290",
            });
          });
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Header title="Crear salida" useBackButton='true'/>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form">
                    <label htmlFor="busName">Nombre del autobús</label>
                    <input
                        type="text"
                        id="busName"
                        value={busName}
                        onChange={(e) => setBusName(e.target.value)}
                        placeholder="Nombre"
                    />
                    <label htmlFor="tripDate">Fecha de salida</label>
                    <DatePicker
                        selected={tripDate}
                        id="tripDate"
                        onChange={(tripDate) => setTripDate(tripDate)}
                        dateFormat="dd/MM/yyyy"
                        className="datePicker"
                    />
                    <label htmlFor="tripTime">Hora de salida</label>
                    <TimePicker ampm={false} id="tripTime" onChange={(tripTime) => setTripTime(tripTime)}/>
                    <label htmlFor="seats">Numero de asientos</label>
                    <input
                        type="number"
                        id="seats"
                        value={seatNumber}
                        onChange={(e) => setSeatNumber(e.target.value)}
                        placeholder="Número de asientos"
                    />
                    <label htmlFor="route">Ruta del autobus</label>
                    <select id="route" value={route} onChange={(e) => setRoute(e.target.value)}>
                        <option value="">Selecciona una ruta</option>
                        <option value="J-C">Juarez-Coatzacoalcos</option>
                        <option value="C-J">Coatzacoalcos-Juarez</option>
                        <option value="S-C">Saltillo-Coatzacoalcos</option>
                        <option value="C-S">Coatzacoalcos-Saltillo</option>
                    </select>
                    <button type="submit">Crear Autobús</button>
                </form>
            </div>
            {isLoading && <LoadingScreen/>}
            </LocalizationProvider>
        </div>
    );
};

export default BusForm;
