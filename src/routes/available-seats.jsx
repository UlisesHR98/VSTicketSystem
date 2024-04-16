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
    { id: 3, number: '2A', isReserved: false },
    { id: 5, number: '2B', isReserved: false },
    { id: 6, number: '3A', isReserved: false },
    { id: 7, number: '3B', isReserved: false },
    { id: 8, number: '4A', isReserved: false },
    { id: 9, number: '4B', isReserved: false },
    { id: 10, number: '5A', isReserved: false },
    { id: 11, number: '5B', isReserved: false },
    { id: 12, number: '6A', isReserved: false },
    { id: 13, number: '6B', isReserved: false },
    { id: 14, number: '7A', isReserved: false },
    { id: 15, number: '7B', isReserved: false },
    { id: 16, number: '8A', isReserved: false },
    { id: 17, number: '8B', isReserved: false },
    // Agrega más asientos según sea necesario
  ];

  const rows = seats.reduce(function (rows, key, index) { 
    return (index % 4 === 0 ? rows.push([key]) 
      : rows[rows.length-1].push(key)) && rows;
  }, []);

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
    <>
      <Col sm={6}>
        <Form className='form-style'>
          {rows.map(row => (
            <Row className='justify-content-md-center'>
              {row.map((seat, index) => {
                return (
                  <>
                    {index === 2 ? <Col xs="auto"> </Col> : null}
                    <Col xs={1} key={seat.id} className="seatWrapper">
                      <Row>
                        <IconButton
                          aria-label="delete"
                          className={`seat ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                          onClick={() => handleSelectSeat(seat.id)}
                        >
                          <EventSeatIcon />
                        </IconButton>
                      </Row>
                      <Row>
                        <div style={{textAlign:'center'}}>{seat.number}</div>
                      </Row>
                    </Col>
                  </>
                );
              })}
            </Row>
          ))}
        </Form>
      </Col>
      <Col>
      </Col>
    </>
    
  );
};

export default SeatSelector;
