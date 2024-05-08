import React from 'react';
import { motion } from 'framer-motion';
import './ticket-form.css';
const Seller = (props) => {
  const debt = props.formData.amountPaid > 0 ? (props.formData.totalAmount >= props.formData.amountPaid ? (props.formData.totalAmount - props.formData.amountPaid < 0 ? '' : props.formData.totalAmount - props.formData.amountPaid) : '') : '';
  const canSubmit = props.isFormFilled && props.isDebtAmountValid && props.areSeatsSelected;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{alignItems: 'center'}}
    >
      <form className="ticket-form" onSubmit={props.handleSubmit} style={{backgroundColor: '#17C1AA', borderColor: '#17C1AA'}}>
        <h2 style={{ color: 'white', textAlign: 'center'}}>Venta de Boleto</h2>
        <label className="label">Nombres:</label>
        <input
          className="input"
          type="text"
          name="firstName"
          value={props.formData.firstName}
          onChange={props.handleChange}
        />
        <label className="label">Apellidos:</label>
        <input
          className="input"
          type="text"
          name="lastName"
          value={props.formData.lastName}
          onChange={props.handleChange}
        />
        <label className="label">Origen:</label>
        <input
          className="input"
          type="text"
          name="origin"
          value={props.formData.origin}
          onChange={props.handleChange}
        />
        <label className="label">Destino:</label>
        <input
          className="input"
          type="text"
          name="destiny"
          value={props.formData.destiny}
          onChange={props.handleChange}
        />
        <label className="label">Número de Teléfono:</label>
        <input
          className="input"
          type="text"
          name="phoneNumber"
          value={props.formData.phoneNumber}
          onChange={props.handleChange}
        />
        <label className="label">Tipo de Pago:</label>
        <input
          className="input"
          type="text"
          name="paymentType"
          value={props.formData.paymentType}
          onChange={props.handleChange}
        />
        <label className="label">Cantidad Total:</label>
        <input
          className="input"
          type="text"
          name="totalAmount"
          value={props.formData.totalAmount}
          onChange={props.handleChange}
          onKeyDown={(e) => {
            if (!/[0-9]|Backspace|Tab|Enter|Delete|ArrowLeft|ArrowRight/.test(e.key)) {
                e.preventDefault();
            }
          }}
        />
        <label className="label">Cantidad Pagada:</label>
        <input
          className="input"
          type="text"
          name="amountPaid"
          value={props.formData.amountPaid}
          onChange={props.handleChange}
          onKeyDown={(e) => {
            if (!/[0-9]|Backspace|Tab|Enter|Delete|ArrowLeft|ArrowRight/.test(e.key)) {
                e.preventDefault();
            }
          }}
        />
        <label className="label">Cantidad a Deber:</label>
        <input
          className="input"
          type="text"
          name="amountDebt"
          value={debt}
          readOnly={true}
        />
        
        {
          !props.isFormFilled ?
          (<p className="error-label">*Favor de llenar todos los datos.</p>)
          :
          null
        }
        {
          !props.isDebtAmountValid ?
          (<p className="error-label">*La Cantidad a Deber no es válida.</p>)
          :
          null
        }
        {
          !props.areSeatsSelected ?
          (<p className="error-label">*Seleccione al menos un asiento.</p>)
          :
          null
        }

        <button className={canSubmit ? 'button' : 'button-disabled'} type="submit" style={{marginTop: '10px'}}>Enviar</button>
      </form>
    </motion.div>
  );
};

export default Seller;
