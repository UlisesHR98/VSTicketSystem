import React, { useRef } from 'react';
import "../components/CardsComponent/CardComponent.css"
import CardComponent from "../components/CardsComponent/CardComponent"
import { IoTicketOutline, IoLogOut } from "react-icons/io5";
import { FaBus, FaStoreAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Header from '../components/HeaderComponent/HeaderComponent';
import Modal from '../components/ModalComponent/ModalComponent';
import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import LoadingScreen from '../components/LoadingScreenComponent/LoadingScreenComponent';
import Printer from '../components/TicketComponent/Printer';
import TicketComponent from '../components/TicketComponent/ticketprinte';
const Menu = () => {
  const ticketData = {
    fecha: '10/05/2024',
    productos: [
      { nombre: 'Producto 1', precio: 10 },
      { nombre: 'Producto 2', precio: 20 },
      { nombre: 'Producto 3', precio: 30 },
    ],
    total: 60,
  };


  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const handleClickLogout = (path) => {
    setIsLoading(true);
    axios.post('http://127.0.0.1:8000/VDSTicketApp/logout/', {
      username: 'wallc'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authToken')
      }
    }).then(response => {
      setIsLoading(false);
      localStorage.removeItem('authToken');
      navigate(path);
    })
      .catch(error => {
        setIsLoading(false);
        Swal.fire({
          title: "Error",
          text: "No se pudo cerrar sesion",
          icon: "error",
          iconColor: "#1ccda0",
          confirmButtonColor: "#0da290",
        });
      });

  };
  const handlePrint = () => {
    const printContent = componentRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  };
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const componentRef = useRef();
  return (
    <div>
      <Header title="Bienvenido" />
      <div className="cards-container">
        <CardComponent
          title="Buscar Salidas"
          content="Buscar asientos disponibles para una fecha específica"
          Icon={FaBus}
          onClick={() => handleClick('/departure-searcher')}
        />
        <CardComponent
          title="Buscar Cliente"
          content="Buscar información de cliente con boleto comprado/apartado"
          Icon={IoTicketOutline}
          onClick={() => handleClick('/customer-searcher')}
        />
        <CardComponent
          title="Crear Salida"
          content="Agregar un autobus disponible para viajar en una fecha y destino específicos"
          Icon={FaStoreAlt}
          onClick={() => handleClick('/create-bus')}
        />
        <CardComponent
          title="Cerrar Sesión"
          content="Salir del sistema"
          Icon={IoLogOut}
          onClick={() => setOpenModal(true)}
        />
        
        {setOpenModal && <Modal
          title="Atención"
          content="¿Seguro que quieres salir?"
          openModal={openModal}
          closeModal={setOpenModal}
          onClick={() => handleClickLogout('/Login')}
        />}
        {isLoading && <LoadingScreen />}
      </div>
      {/* <div><Printer /></div> */}
      <div>
      <div ref={componentRef}>
        <TicketComponent date="2024-05-20" customer="John Doe" />
      </div>
      <button onClick={handlePrint}>Imprimir Ticket</button>
    </div>
    </div>
  );
};

export default Menu;
