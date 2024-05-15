import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import './Printer.css';

const Printer = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <div ref={componentRef} className="ticket">
                <img src="Logo.png" alt="Logo" className="ticket-image" />
                <h1 className="ticket-title">Viajes Turisticos Del Sur</h1>
                <div className="ticket-info">
                    <p><strong>Nombre:</strong> {"Ulises Hernandez"}</p>
                    <p><strong>Origen:</strong> {"Juarez"}</p>
                    <p><strong>Destino:</strong> {"Veracruz"}</p>
                    <p><strong>Fecha:</strong> {"Hoy"}</p>
                    <p><strong>Hora:</strong> {"5 PM"}</p>
                    <p><strong>Numeros de asientos:</strong> {"1,2,3"}</p>
                    <p><strong>Precio total:</strong> {"1000 pesos"}</p>
                    <p><strong>Abono:</strong> {"100 pesos"}</p>
                    <p><strong>Debe:</strong> {"900 pesos"}</p>
                    <p><strong>Vendedor:</strong> {"Teodoro"}</p>
                    <p><strong>Fecha y hora de venta:</strong> {"12/12/2022 14:56"}</p>
                </div>
                <p className="terms">En esta parte del texto se pueden añadir
                    terminos y condiciones tales como: el cliente debe de llegar
                    1 hora antes de su salida y el peso maximod e su equipaje debe de ser de 10kg</p>
            </div>
            <button onClick={handlePrint}>Print article</button>
        </>
    );
}
export default Printer;