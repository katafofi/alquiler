import { useState, useEffect } from 'react';

const calcCredit = (payments, Total) => {
  if (payments.length === 0) return { credit: 0, balance: 0, lastCredit: "" };
  let credit = 0;
  payments.forEach(payment => {
    credit += parseFloat(payment.Valor)
  })
  const balance = parseFloat(Total) - parseFloat(credit);
  const lastCredit = (new Date(payments.slice(-1)[0].FechadPago)).toLocaleDateString('es-CO', { timeZone: 'UTC' });
  return { credit, balance, lastCredit };
}

const generateInvoice = async (id) => {
  const FORM = "invoice";
  const URL = "http://localhost:";
  const PORT = "3003";
  try {
    const response = await fetch(`${URL}${PORT}/${FORM}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data = await response.json();
    data.FechaCompra = new Date(data.FechaCompra);
    data.FechaInicialAlquiler = new Date(data.FechaInicialAlquiler);
    data.FechaFinlAlquiler = new Date(data.FechaFinlAlquiler);
    const { credit, balance, lastCredit } = calcCredit(data.payments, data.Total);
    data = {
      ...data,
      credit,
      balance,
      lastCredit
    }
    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
};


export const useInvoiceData = (id) => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await generateInvoice(id);
        setInvoiceData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error:", error.message);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return [invoiceData, error];
};