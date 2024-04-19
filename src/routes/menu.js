import "../components/CardsComponent/CardComponent.css"
import CardComponent from "../components/CardsComponent/CardComponent"
import { IoTicketOutline } from "react-icons/io5";
import { FaBus, FaStoreAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Header from '../components/HeaderComponent/HeaderComponent';
 

const Menu = () => {

  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Header title="Bienvenido"/>
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
      </div>
    </div>
  );
};

export default Menu;
