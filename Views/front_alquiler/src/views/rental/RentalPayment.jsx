import { useState, useEffect } from "react";
import ButtonCataComponente from "../../components/provider/Button/Button";
import InputCataComponente from "../../components/provider/Input/Input";
import { SelectCataComponente } from "../../components/provider/Select/Select";
import { Col, Container, Row } from "react-bootstrap";

const NewPayments = (
  {
    idPurchaseOrder,
    updateActiveKeys,
    updateRentalStatus,
    rentalStatus
  }
) => {
  const [forms, setForm] = useState([]);
  const [news, setNews] = useState({
    //IdPago
    FechadPago: "",
    Valor: "",
    IdEstadoPago: "",
    IdTipoPago: "",
    IdOrdenCompra: idPurchaseOrder,
  });

  const [EstadoPagoOptions, setEstadoPagoOptions] = useState([]);
  const [TipoPagoOptions, setTipoPagoOptions] = useState([]);

  const FORM = "payments";
  const URL = "http://localhost:";
  const PORT = "3003";

  const nextKeys = ['5']

  useEffect(() => {
    handleGetEstadoPago();
    handleGetTipoPago();
  }, []);

  const handleGetEstadoPago = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/statusPay`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdEstadoPago, //lo que selecciona en el back
        label: element.Descripcion + " - " + element.IdEstadoPago, //lo que se ve en el selector
      }));
      setEstadoPagoOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetTipoPago = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/paymentType`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdTipoPago, //lo que selecciona en el back
        label: element.Descripcion + " - " + element.IdTipoPago, //lo que se ve en el selector
      }));
      setTipoPagoOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/${FORM}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(news),
      });
      const data = await response.json();
      return data
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await handleCreate();
      updateRentalStatus({ payment: data })
      updateActiveKeys(nextKeys)
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

  return (
    <>
      <Container  >
        <Row>
          <Col className="col-6">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">
                <InputCataComponente
                  value={news.FechadPago}
                  onChange={handleInput}
                  placeholder={"Ingrese Fecha de pago"}
                  id={"FechadPago"}
                  type={"date"}
                  name={"FechadPago"}
                  label={"FechadPago"}
                />

                <InputCataComponente
                  value={news.Valor}
                  onChange={handleInput}
                  placeholder={"Ingrese precio"}
                  id={"Valor"}
                  type={"number"}
                  name={"Valor"}
                  label={"Valor"}
                />

                <SelectCataComponente
                  required
                  label={"- Seleccionar Estado De pago -"}
                  name={"IdEstadoPago"}
                  value={news.IdEstadoPago}
                  options={EstadoPagoOptions}
                  onChange={handleSelect}
                />

                <SelectCataComponente
                  required
                  label={"- Seleccionar Tipo de pago "}
                  name={"IdTipoPago"}
                  value={news.IdTipoPago}
                  options={TipoPagoOptions}
                  onChange={handleSelect}
                />

                <ButtonCataComponente
                  type="submit"
                  className="btn btn-primary btn-block"
                  title="Pagar"
                />
              </div>
            </form>
          </Col>
          <Col>
            <h3>Total a pagar:</h3>
            <h4>{rentalStatus.purchaseOrder.Total} $</h4>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NewPayments