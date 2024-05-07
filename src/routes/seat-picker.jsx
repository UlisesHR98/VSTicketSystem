import React from 'react';
import './available-seats.css';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import IconButton from '@mui/material/IconButton';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import busback from '../images/bus-back.png';
import busfront from '../images/bus-front.png';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const SeatPicker = (props) => {
  const rows = props.seats.reduce(function (rows, key, index) { 
    return (index % 4 === 0 ? rows.push([key]) 
      : rows[rows.length-1].push(key)) && rows;
  }, []);

  return (
    <>
      <div style={{position: 'relative', left: props.isMobile ? '30%' : ''}}>
        <div style={{marginTop: `${props.isMobile ? '0px' : '150px'}` , right: `${props.isMobile ? '50px' : '-10px'}`, position: props.isMobile ? 'static' : 'absolute'}}>
          <Stack direction="row" alignItems="center" gap={1}>
            <EventSeatIcon style={{color: '#0B5848'}} />
            <Typography variant="body1" style={{fontSize: '14px', padding: '5px'}}>Disponible</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" gap={1}>
            <EventSeatIcon style={{color: '#BBD4CE'}} />
            <Typography variant="body1" style={{fontSize: '14px', padding: '5px'}}>Ocupado</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" gap={1}>
            <EventSeatIcon style={{color: '#FFFFFF'}} />
            <Typography variant="body1" style={{fontSize: '14px', padding: '5px'}}>Seleccionado</Typography>
          </Stack>
        </div>
      </div>
      <Form className='form-style' style={{ marginLeft: 'auto', marginRight: `${props.isMobile ? '0 auto' : 'auto'}` }}>
        <Row>
          <img src={busfront} style={{ width:'100%', maxWidth: '280px', margin: '0 auto'}}alt='front bus'/>
        </Row>
        {rows.map((row, indexRow) => (
          <Row className='justify-content-center col-align-self-center' style={{marginLeft: '-4px', marginTop: '-4px'}} key={indexRow}>
            {row.map((seat, seatIndex) =>(
              <React.Fragment key={seatIndex}>
                {seatIndex === 2 ? <Col xs="auto"> </Col> : null}
                <Col xs={1} key={seat.id} className="seatWrapper">
                  <Row>
                    <IconButton
                      aria-label="delete"
                      className={`seat ${props.selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                      onClick={() => props.handleSelectSeat(seat.id)}
                      disabled={!seat.is_empty}
                      sx={{
                        "&.Mui-disabled": {
                          color: "#bbd4ce"
                        }
                      }}
                    >
                      <EventSeatIcon />
                    </IconButton>
                  </Row>
                  <Row style={{marginLeft: props.isMobile ? '-12px' : '-3px'}}>
                    <div style={{textAlign:'', fontSize: '12px', marginBottom: '10px', color: seat.is_empty ? '' : '#588d80'}}>{seat.seat_number}</div>
                  </Row>
                </Col>
              </React.Fragment>
            ))}
          </Row>
        ))}
        <Row style={{marginTop: "-14px"}}>
          <img src={busback} style={{ width:'100%', maxWidth: '280px', margin: '0 auto' }} alt='back bus'/>
        </Row>
      </Form>
    </>
    
  );
};

export default SeatPicker;
