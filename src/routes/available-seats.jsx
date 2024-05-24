import React, { useEffect, useState } from 'react';
import './available-seats.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Seller from './ticket-form';
import { useLocation, useNavigate } from 'react-router-dom';
import SeatPicker from './seat-picker';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Swal from 'sweetalert2';
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreenComponent/LoadingScreenComponent';

const SeatSelector = () => {
  const { state: seats } = useLocation();
  const navigate = useNavigate();
  const apiUrl = 'http://127.0.0.1:8000/VDSTicketApp/tickets/';

  const [selectedSeats, setSelectedSeats] = useState([]);
  const handleSelectSeat = (seatId) => {
    setSelectedSeats((prevSelectedSeats) => {
      const isSelected = prevSelectedSeats.includes(seatId);
      if (isSelected) {
        return prevSelectedSeats.filter((id) => id !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });
  };

  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    origin: '',
    destiny: '',
    phoneNumber: '',
    paymentType: '',
    totalAmount: '',
    amountPaid: '',
    amountDebt: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevParams => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post(apiUrl,{
      name: formData.firstName,
      last_names: formData.lastName,
      origin: formData.origin,
      destiny: formData.destiny,
      trip_date: "2024-04-17",
      phone_number: formData.phoneNumber,
      seats: selectedSeats,
      payment_type: formData.paymentType,
      total_amount: formData.totalAmount,
      amount_paid: formData.amountPaid,
      amount_debt: formData.totalAmount - formData.amountPaid,
      is_ticket_paid: formData.amountDebt === 0
    },{
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      setIsLoading(false);
      Swal.fire({
        title: "Ticket creado",
        text: "Los asientos han sido creados correctamente.",
        icon: "success",
        iconColor: "#1ccda0",
        confirmButtonColor: "#0da290",
      });
      navigate("/departure-searcher", {state: response.data});
    })
    .catch(error => {
      setIsLoading(false);
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
          text: "Algún dato ingresado es incorrecto.",
          icon: "error",
          iconColor: "#1ccda0",
          confirmButtonColor: "#0da290",
        });
      }
    });
  };

  const isMobile = width <= 991;
  let canSubmit = false;
  if (formData.firstName !== '' && formData.lastName !== '' && formData.origin !== '' && formData.destiny !== '' && formData.phoneNumber !== '' && formData.paymentType !== '' && 
      formData.paymentType !== '' && formData.totalAmount !== '' && formData.amountPaid !== '' && (formData.totalAmount - formData.amountPaid) >= 0 && selectedSeats.length > 0) {
    canSubmit = true;
  }
  const isFormFilled = formData.firstName !== '' && formData.lastName !== '' && formData.origin !== '' && formData.destiny !== '' && formData.phoneNumber !== '' && formData.paymentType !== '' && 
  formData.paymentType !== '' && formData.totalAmount !== '' && formData.amountPaid !== '';
  const isDebtAmountValid = (formData.totalAmount - formData.amountPaid) >= 0;
  const areSeatsSelected = selectedSeats.length > 0

  return (
    <>
      <div className="container" style={{backgroundColor: '#1AC8A4', marginTop: '8px'}}>
      { isMobile ? 
        <Tabs
          defaultActiveKey="seats"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="seats" title="Asientos Disponibles">
            <SeatPicker seats={seats} selectedSeats={selectedSeats} handleSelectSeat={handleSelectSeat} isMobile={isMobile}/>
          </Tab>
          <Tab eventKey="sell-ticket" title="Venta de Boleto/s">
            <Seller handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} canSubmit={canSubmit}/>
          </Tab>
        </Tabs>
      :
        <Row>
          <Col sm={6} style={{marginTop: '-10px'}}>
            <SeatPicker seats={seats.sort((a, b) => a.id - b.id)} selectedSeats={selectedSeats} handleSelectSeat={handleSelectSeat} isMobile={isMobile}/>
          </Col>
          <Col sm={6}>
            <Seller handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} isFormFilled={isFormFilled} isDebtAmountValid={isDebtAmountValid} areSeatsSelected={areSeatsSelected}/>
          </Col>
        </Row>
      }
      {isLoading && <LoadingScreen/>}
      </div>
    </>
  );
};

export default SeatSelector;
