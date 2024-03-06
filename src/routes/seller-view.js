import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './seller-view.css'; // Importa el archivo CSS

const Seller = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    travelDate: '',
    numberOfTickets: '',
    route: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar los datos a tu backend o donde los necesites
    console.log(formData);
  };

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ color: 'white' }}>Venta de Boleto</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label className="label">Nombre Completo:</label>
          <input
            className="input"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <label className="label">Fecha de Viaje:</label>
          <input
            className="input"
            type="date"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
          />
          <label className="label">Número de Boletos:</label>
          <input
            className="input"
            type="number"
            name="numberOfTickets"
            value={formData.numberOfTickets}
            onChange={handleChange}
          />
          <label className="label">Ruta:</label>
          <input
            className="input"
            type="text"
            name="route"
            value={formData.route}
            onChange={handleChange}
          />
          <label className="label">Número de Teléfono:</label>
          <input
            className="input"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <label className="label">Correo (Opcional):</label>
          <input
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <button className="button" type="submit">Enviar</button>
        </form>
      </motion.div>
    </div>
  );
};

export default Seller;
