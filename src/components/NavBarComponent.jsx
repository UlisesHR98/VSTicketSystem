import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from './ModalComponent/ModalComponent';
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const location = useLocation();

    const handleClickLogout = (path) => {
        axios.post('http://127.0.0.1:8000/VDSTicketApp/logout/', {
          'refresh_token': localStorage.getItem('refresh_token')
        },{
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(response => {
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
          });
    
      };
    

    return (
        <Navbar>
            <Nav variant="underline" defaultActiveKey={location.pathname} className="navItemsClass">
                <Nav.Link href="/departure-searcher" >Buscar Salidas</Nav.Link>
                <Nav.Link href="/customer-searcher" >Buscar Cliente</Nav.Link>
                <Navbar.Brand href="/menu" >
                    <img
                        src='Logo.png'
                        width="100"
                        height="100"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Nav.Link href="/create-bus">Crear Salida</Nav.Link>
                <Nav.Link onClick={() => setOpenModal(true)}>Cerrar Sesion</Nav.Link>
                {setOpenModal && <Modal
                    title="Atención"
                    content="¿Seguro que quieres salir?"
                    openModal={openModal}
                    closeModal={setOpenModal}
                    onClick={() => handleClickLogout('/Login')}
                />}
            </Nav>
        </Navbar>
    )
};

export default NavBar;