import "../components/CardsComponent/CardComponent.css"
import CardComponent from "../components/CardsComponent/CardComponent"
import { IoTicketOutline, IoLogOut } from "react-icons/io5";
import { FaBus, FaStoreAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Modal from '../components/ModalComponent/ModalComponent';
import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import LoadingScreen from '../components/LoadingScreenComponent/LoadingScreenComponent';
import NavBar from "../components/NavBarComponent";

const Menu = () => {

  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const handleClickLogout = (path) => {
    setIsLoading(true);
    axios.post('http://127.0.0.1:8000/VDSTicketApp/logout/', {
      'refresh_token': localStorage.getItem('refresh_token')
    },{
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      setIsLoading(false);
      localStorage.removeItem('authToken');
      navigate(path);
    })
      .catch(error => {
        if (error.response.status === 401) {
          navigate("/Login");
        } else {
          Swal.fire({
            title: "Error",
            text: "No se pudo cerrar sesion",
            icon: "error",
            iconColor: "#1ccda0",
            confirmButtonColor: "#0da290",
          });
        }
        setIsLoading(false);
      });

  };

  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <NavBar></NavBar>
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
    </div>
  );
};

export default Menu;
