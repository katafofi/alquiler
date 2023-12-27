const Clients = require("../Models/clients.model");
const NegativeRecord = require("../Models/negativeRecord.model");
const PuchaseOrder = require("../Models/purchase_order.model");
const Renting = require("../Models/renting.model");

Clients

const ReportsNegativeEmail = async (req, res) => {
    try {
        const { to, subject, text } = req.body;


        // para mas informacion https://www.freecodecamp.org/espanol/news/como-usar-nodemailer-para-enviar-correos-electronicos-desde-tu-servidor-node-js/
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
                clientId: process.env.OAUTH_CLIENTID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN
            },
        });

        const mailOptions = {
            from: 'stevenhernandezj@gmail.com',
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully.');
        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email.' });
    }

};


const Consult = async (req, res) => {
    const Cedula = req.params.Cedula;

    try {
        // tambien puede ser 
        /* SELECT *
            FROM Alquiler2.Clientes AS c
            INNER JOIN Alquiler2.Alquilers AS a ON c.idCliente = a.idCliente
            INNER JOIN Alquiler2.OrdenCompras AS o ON a.IdAlquiler = o.IdAlquiler 
            INNER JOIN Alquiler2.RegistroNegativos AS r ON o.IdOrdenCompra = r.IdOrdenCompra 
            WHERE c.Cedula = 2; */
        const clientesData = await Clients.findAll({
            where: { Cedula },
            include: [
                {
                    model: Renting,
                    include: [
                        {
                            model: PuchaseOrder,
                            include: [NegativeRecord],
                        },
                    ],
                },
            ],
        });

        res.status(200).json({ message: clientesData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
}

const all = {
    ReportsNegativeEmail,
    Consult
};

module.exports = all;