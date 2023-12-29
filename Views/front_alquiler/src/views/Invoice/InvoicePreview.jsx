import { Preview, print } from 'react-html2pdf';
import Table from 'react-bootstrap/Table';
import './InvoicePreview.css'
import { Button } from 'react-bootstrap';

const InvoicePreview = () => {
  const name = 'Angie Ramos Jimenez'
  return (
    <div>

      <Preview id={'jsx-template'} >
        <div>
          <header>
            <div >
              <img src="" alt="" />
              <div >
                <div>
                  <p>VENTA Y ALQUILER DE VESTIDOS PARA NOVIA, COCTEL, GRADOS QUINCE AÑOS Y PRIMERA COMUNIÓN</p>
                  <p>{name}</p>
                </div>
              </div>
            </div>
            <p>Transv. 78 L No. 68 - 03 Sur 2do. Piso . Bosa Piamonte . Cel: 320 805 6350 - 320 805 8884</p>

            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Dia</th>
                    <th>Mes</th>
                    <th>Año</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>3</td>
                    <td>Dic</td>
                    <td>2023</td>
                  </tr>
                </tbody>
              </Table>
              <table>
                <tbody>
                  <tr>
                    <td>Orden de trabajo</td>
                    <td>5709</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </header>
          {/* <main>
              <table>
                <tbody>
                  <tr>
                    <td>Nombre:</td>
                    <td colSpan="4">Daniel Alejandro Castaño Zapata</td>
                    <td>Cel:</td>
                    <td>3208367828</td>
                  </tr>
                  <tr>
                    <td>Direccion:</td>
                    <td colSpan="6">cll 65 sur #81 A 10</td>
                  </tr>
                  <tr>
                    <td>Barrio:</td>
                    <td colSpan="6">Bosa Antonia Santos</td>
                  </tr>
                  <tr>
                    <td>Ref:</td>
                    <td colSpan="4">Carmen Chiquiyo</td>
                    <td>Tel:</td>
                    <td>3205539176</td>
                  </tr>
                  <tr>
                    <td>Fecha Retirado:</td>
                    <td>Día</td>
                    <td>4</td>
                    <td>Mes</td>
                    <td>Dic</td>
                    <td>Año</td>
                    <td>23</td>
                  </tr>
                  <tr>
                    <td>Fecha devolución:</td>
                    <td>Día</td>
                    <td>4</td>
                    <td>Mes</td>
                    <td>Dic</td>
                    <td>Año</td>
                    <td>23</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th>CANT</th>
                    <th>ARTICULO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Vestido</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Vestido</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th>CANT</th>
                    <th>ARTICULO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Pulsera</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Pulsera</td>
                  </tr>
                </tbody>
              </table>
            </main>
            <footer>
              <div>
                <p>El cliente esta en la obligación de responder por las prendas ya descritas</p>
                <p>El retardo en la devolución de las prendas ocasionara</p>
                <p><strong>MULTA DE $10.000 DIARIOS.</strong></p>
                <p>El cliente esta obligado a llevar las prendas estipuladas en esta factura.</p>
                <p><strong>Por Ningún Motivo se Hará Devolución de Dinero Ni Transferencia de Saldos a Otra Factura.</strong></p>
                <p>La entrega de las prendas será en la fecha establecida en esta factura.</p>
                <p>Después de las 3 pm para la entrega de las prendas favor traer fotocopia de cédula de la persona quien venga a
                  mirarlas y un recibo público de agua o luz.</p>
                <table>
                  <tbody>
                    <tr>
                      <td>Firma</td>
                      <td>Catalina</td>
                    </tr>
                    <tr>
                      <td>C.C.</td>
                      <td>12319021</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h3>TOTAL $</h3>
                <p>70000</p>
                <h3>ABONO $</h3>
                <p>70000</p>
                <h3>SALDO $</h3>
                <p>70000</p>
              </div>
            </footer> */}
        </div>
      </Preview>
      <Button onClick={() => print("a", "jsx-template")}>Generar PDF</Button>
    </div>
  )
}

export default InvoicePreview