import React, { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreenComponent/LoadingScreenComponent';
import './customer-searcher.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../components/HeaderComponent/HeaderComponent';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

const CustomerSearcher = () => {
  const [clientName, setClientName] = useState('');
  const [clientLName, setClientLName] = useState('');
  const [origin, setOrigin] = useState();
  const [destiny, setDestiny] = useState();
  const [tripDate, setTripDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [customerName, setcustomerName] = useState('');
  const [customerLName, setcustomerLName] = useState('');
  const [customerPhone, setcustomerPhone] = useState('');
  const [customerDestiny, setcustomerDestiny] = useState('');
  const [customerOrigin, setcustomerOrigin] = useState('');
  const [customerDate, setcustomerDate] = useState(new Date());
  const [customerPaid, setcustomerPaid] = useState('');
  const [customerDebt, setcustomerDebt] = useState('');

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

  useEffect(() => {
    assignCustomerInfo();
  }, [customer]);

  const isMobile = width <= 768;

  const formatDateForBackend = (date) => {
    const dateString = new Date(date);
    const year = dateString.getFullYear();
    const month = (dateString.getMonth() + 1).toString().padStart(2, '0');
    const day = dateString.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const assignCustomerInfo = () => {
    debugger;

    setcustomerName(customer.name);
    setcustomerLName(customer.last_names);
    setcustomerPhone(customer.phone_number);
    setcustomerDestiny(customer.destiny);
    setcustomerOrigin(customer.origin);
    setcustomerDate(customer.trip_date);
    setcustomerPaid(customer.amount_paid);
    setcustomerDebt(customer.amount_debt);
  }

  const handleClick = (id) => {
    axios.get(`http://127.0.0.1:8000/VDSTicketApp/tickets/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authToken'),
      }
    })
      .then(response => {
        //setIsLoading(true);
        document.getElementById('divCustomerInfo').style.visibility = "visible";
        setCustomer(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          iconColor: "#1ccda0",
          confirmButtonColor: "#0da290",
        })
      });
  };

  const getTicketInfo = (e) => {
    e.preventDefault();
    axios.get('http://127.0.0.1:8000/VDSTicketApp/tickets/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authToken'),
      },
      params: {
        name: clientName,
        last_names: clientLName,
        origin: origin,
        destiny: destiny,
        trip_date: tripDate,
      }
    })
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        Swal.fire({
          title: "Error",
          text: "Usuario o contraseña incorrectos",
          icon: "error",
          iconColor: "#1ccda0",
          confirmButtonColor: "#0da290",
        });
      });
  }
  return (
    <div>
      <Header title="Buscar pasajero" useBackButton='true' />
      <div className="cards-container-customer">
        <form onSubmit={getTicketInfo}>
          <Row style={{ display: `${isMobile ? 'inline' : ''}` }} sm={12}>
            <Col sm={2}>
              <label htmlFor="clientName">Nombre</label>
              <input
                type="text"
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Nombre"
              />
            </Col>
            <Col sm={2}>
              <label htmlFor="clientLName">Apellido</label>
              <input
                type="text"
                id="clientLName"
                value={clientLName}
                onChange={(e) => setClientLName(e.target.value)}
                placeholder="Apellido"
              />
            </Col>

            <Col sm={2}>
              <label htmlFor="origin">Origen</label>
              <input
                type="text"
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Origen"
              />
            </Col>
            <Col sm={2}>
              <label htmlFor="destiny">Destino</label>
              <input
                type="text"
                id="destiny"
                value={destiny}
                onChange={(e) => setDestiny(e.target.value)}
                placeholder="Destino"
              />
            </Col>
            <Col sm={2}>
              <label>Fecha</label>
              <input
                type="date"
                name="travelDate"
                value={tripDate}
                onChange={(e) => setTripDate(e.target.value)}
              />
            </Col>
            <Col sm={2}>
              <button className='button-buscar' type="submit">Buscar pasajero</button>
            </Col>
          </Row>
        </form>
      </div>
      <div className="customers-result">
        {
          customers.map((element, key) => (
            <React.Fragment key={key}>
              <div className='customers-rows'>
                <label style={{ fontWeight: 'bold' }}>Nombre:</label>
                <label>{element.name}</label>
                <label style={{ fontWeight: 'bold' }}>Apellidos:</label>
                <label>{element.last_names}</label>
                <label style={{ fontWeight: 'bold' }}>Telefono:</label>
                <label>{element.phone_number}</label>
                <label style={{ fontWeight: 'bold' }}>Origen:</label>
                <label >{element.origin}</label>
                <label style={{ fontWeight: 'bold' }}>Destino:</label>
                <label>{element.destiny}</label>
                <button onClick={() => handleClick(element.id)} className='button-customers'>Seleccionar</button>
              </div>
            </React.Fragment>
          ))
        }
      </div>
      <div className='customers-info'>
        <div id='divCustomerInfo' style={{ visibility: 'hidden' }} className='customers-container'>
          <Row sm={6}>
            <Col sm={2} style={{ margin: '10px' }}>
              <label style={{ fontWeight: 'bold' }}>Nombre:</label>
            </Col>
            <Col sm={3} style={{ margin: '10px' }}>
              <input type='text'
                id="txtName"
                value={customerName}
                onChange={(e) => setcustomerName(e.target.value)}
                placeholder="Name"></input>
            </Col>
            <Col style={{ margin: '10px' }}>
              <label style={{ fontWeight: 'bold' }}>Fecha:</label>
            </Col>
            <Col style={{ margin: '10px' }}>
              <input type='date'
                id="txtDate"
                value={formatDateForBackend(customerDate)}
                onChange={(e) => setcustomerDate(e.target.value)}
                placeholder="DateInfo"></input>
            </Col>
          </Row>
          <Row sm={6}>
            <Col style={{ margin: '10px' }}>
              <label style={{ fontWeight: 'bold' }}>Apellidos:</label>
            </Col>
            <Col sm={3} style={{ margin: '10px' }}>
              <input type='text'
                id="txtLastName"
                value={customerLName}
                onChange={(e) => setcustomerLName(e.target.value)}
                placeholder="LastName"></input>
            </Col>
            <Col style={{ margin: '10px' }}>
              <label style={{ fontWeight: 'bold' }}>Monto pagado:</label>
            </Col>
            <Col style={{ margin: '10px' }}>
              <input type='number'
                id="txtPaidAmount"
                value={customerPaid}
                onChange={(e) => setcustomerPaid(e.target.value)}
                placeholder="PaidAmount"></input>
            </Col>
          </Row>
          <Row sm={6}>
            <Col style={{ margin: '10px' }}>
              <label style={{ fontWeight: 'bold' }}>Telefono:</label>
            </Col>
            <Col sm={3} style={{ margin: '10px' }}>
              <input type='text'
                id="txtPhoneNum"
                value={customerPhone}
                onChange={(e) => setcustomerPhone(e.target.value)}
                placeholder="PhoneNum"></input>
            </Col>
            <Col style={{ margin: '10px' }}>
              <label style={{ fontWeight: 'bold' }}>Monto por pagar:</label>
            </Col>
            <Col style={{ margin: '10px' }}>
              <input type='number'
                id="txtDebtAmount"
                value={customerDebt}
                onChange={(e) => setcustomerDebt(e.target.value)}
                placeholder="DebtAmount"></input>
            </Col>
          </Row>
          <Row sm={6}>
            <Col style={{ margin: '10px' }}>
              <label style={{ fontWeight: 'bold' }}>Destino:</label>
            </Col>
            <Col style={{ margin: '10px' }}>
              <input type='text'
                id="txtDestiny"
                value={customerDestiny}
                onChange={(e) => setcustomerDestiny(e.target.value)}
                placeholder="DestinyInfo"></input>
            </Col>
          </Row>
          <Row sm={6}>
            <Col style={{ margin: '10px' }}>
              <label style={{ fontWeight: 'bold' }}>Origen:</label>
            </Col>
            <Col style={{ margin: '10px' }}>
              <input type='text'
                id="txtOrigin"
                value={customerOrigin}
                onChange={(e) => setcustomerOrigin(e.target.value)}
                placeholder="OriginInfo"></input>
            </Col>
          </Row>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className='button-customers'>Actualizar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerSearcher
