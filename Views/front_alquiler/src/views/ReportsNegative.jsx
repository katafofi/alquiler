import { useState } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import InputCataComponente from "../components/provider/Input/Input";

const ReportsNegative = () => {
    const [REPORT, setREPORT] = useState('')
    const [id, setID] = useState('')


    const ReportsNegative = () => {
        const emailData = {
            to: 'stevenhernandezj@gmail.com', //todos los correos
            subject: 'Hello from Nodemailer',
            text: 'Hello, this is a test email from Nodemailer!',
        };

        fetch('http://localhost:3003/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        })
            .then(response => response.json())
            .then(data => {
                setREPORT(data.message);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const Consult = () => {
        fetch('http://localhost:3003/send-email/' + id)
            .then(response => response.json())
            .then(data => {
                setREPORT(data.message.length > 0 ? 'reportado' : 'aprobado');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setID(value);
    };

    return (<>
        <h1>Valide si el usuario esta reportado, en caso de estarlo se enviara al correo de todas las tiendas</h1>
        <div style={{ width: '250px', height: '250px', padding: 10 }}>
            <InputCataComponente
                value={id}
                onChange={handleInput}
                placeholder={"ID USUARIO"}
                id={"ID USUARIO"}
                type={"number"}
                name={"ID USUARIO"}
                label={"ID USUARIO"}
            ></InputCataComponente>
            <ButtonCataComponente title={'Validar'} type={'button'} onClick={() => Consult()}></ButtonCataComponente>
            <br />
            <br />
            <h1 style={{ backgroundColor: "black", color: "white" }}>{REPORT}</h1>
        </div>
    </>)
}

export default ReportsNegative  