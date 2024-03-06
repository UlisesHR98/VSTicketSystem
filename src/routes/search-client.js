import React, { useState } from 'react';
import './search-client.css';
import Header from '../components/HeaderComponent/HeaderComponent';

const Client = () =>{
  const [nombre, setNombre] = useState('');
  const [ruta, setRuta] = useState('');
  const [fecha, setFecha] = useState('');

  const buscarPasajeros = (e) => {
    e.preventDefault();
    // Aquí deberías añadir la lógica para buscar los pasajeros
    console.log(`Buscando pasajeros con nombre: ${nombre}, ruta: ${ruta}, fecha: ${fecha}`);
  };

  return (
    <div>
      <Header title="Buscar cliente" useBackButton='true'/>
      <form className="form-busqueda" onSubmit={buscarPasajeros}>
        <label>Nombre del pasajero</label>
        <input
          className="input-field"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del pasajero"
        />
        <label>Ruta de viaje</label>
        <input
          className="input-field"
          type="text"
          value={ruta}
          onChange={(e) => setRuta(e.target.value)}
          placeholder="Ruta de viaje"
        />
        <label>Fecha de salida</label>
        <input
          className="input-field"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <button type="submit" className="button-buscar">Buscar Pasajeros</button>
      </form>
    </div>
  );
}

export default Client;
