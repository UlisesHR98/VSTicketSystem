import React, { useState } from 'react';
import Header from '../components/HeaderComponent/HeaderComponent';
import DatePicker from 'react-datepicker';

const CustomerSearcher = () => {
    const [clientName, setClientName] = useState('');
    const [tripDate, setTripDate] = useState(new Date());
    const [route, setRoute] = useState('');

    return (
        <div>
            <Header title="Buscar pasajero" useBackButton='true'/>
            <div className="form-container">
                <form  className="form">
                    <label htmlFor="clientName">Nombre del pasajero</label>
                    <input
                        type="text"
                        id="clientName"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Nombre completo"
                    />
                    <label htmlFor="date">Fecha de salida</label>
                    <DatePicker
                        selected={tripDate}
                        id="date"
                        onChange={(date) => setTripDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="datePicker"
                    />
                    <label htmlFor="route">Ruta de viaje</label>
                    <select id="route" value={route} onChange={(e) => setRoute(e.target.value)}>
                        <option value="">Selecciona una ruta</option>
                        <option value="J-C">Juarez-Coatzacoalcos</option>
                        <option value="C-J">Coatzacoalcos-Juarez</option>
                        <option value="S-C">Saltillo-Coatzacoalcos</option>
                        <option value="C-S">Coatzacoalcos-Saltillo</option>
                    </select>
                    <button type="submit">Buscar pasajero</button>
                </form>
            </div>
        </div>
    )
}

export default CustomerSearcher
