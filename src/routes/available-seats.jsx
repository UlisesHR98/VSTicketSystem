import React, { useState } from 'react';
import './available-seats.css';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import IconButton from '@mui/material/IconButton';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const SeatSelector = () => {
  const seats = [
    { id: 1, number: '1A', isReserved: false },
    { id: 2, number: '1B', isReserved: false },
    { id: 3, number: '1C', isReserved: false },
    // Agrega más asientos según sea necesario
  ];

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

  return (
    <Form className='form-style'>
      <Row>
      {seats.map((seat) => (
        <Col key={seat.id} className="seatWrapper">
        <IconButton
        aria-label="delete"
        className={`seat ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
        onClick={() => handleSelectSeat(seat.id)}
        >
        <EventSeatIcon />
        </IconButton>
        <div style={{textAlign:'center'}}>{seat.number}</div>
        </Col>
      ))}
      </Row>
    </Form>
  
  );
};

export default SeatSelector;
