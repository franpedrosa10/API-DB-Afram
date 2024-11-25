import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Enviar mail
const sendEmailService = async (to, subject, text) => {
  const mailOptions = {
    from: "afram.bank.not.reply@gmail.com",
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado: " + info.response);
    return info;
  } catch (error) {
    throw new Error(`Error al enviar email: ${error.message}`);
  }
};

// Enviar mail por transferencia
const sendTransferEmailService = async (
  to,
  amount,
  sourceUser,
  destinationUser
) => {
  const emailText = `
        Este es un correo automatizado. No respondas a este correo. 
        Se ha realizado una transferencia desde tu cuenta. A continuación, los detalles de la transacción:

        - Monto transferido: $${amount}
        - Cuenta de origen: ${sourceUser.last_name}, ${sourceUser.real_name}
        - Cuenta de destino: ${destinationUser.last_name}, ${destinationUser.real_name}

        Si necesitas asistencia, por favor contáctanos por teléfono al 2235123456.
    `;

  const mailOptions = {
    from: '"AFRAM Group" <noreply@aframgroup.com>',
    to,
    subject: "Notificación de Transferencia Realizada",
    text: emailText,
    html: `<html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f7f7f7;
                            color: #333;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #ffffff;
                            border-radius: 8px;
                            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            padding: 10px;
                        }
                        .header img {
                            width: 150px;
                            height: auto;
                        }
                        .content {
                            padding: 20px;
                            font-size: 16px;
                        }
                        .footer {
                            text-align: center;
                            font-size: 12px;
                            color: #777;
                            padding: 10px;
                        }
                        .footer a {
                            color: #007BFF;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                <div class="container">
                        <div class="content">
                        <p>Estimado/a cliente,</p>

                        <p>Te informamos que se ha realizado una transferencia desde tu cuenta. A continuación, encontrarás los detalles de la transacción:</p>
                        <ul>
                        <li><strong>Monto transferido:</strong> $${amount}</li>
                        <li><strong>Cuenta de origen:</strong>  ${sourceUser.last_name}, ${sourceUser.real_name}</li>
                        <li><strong>Cuenta de destino:</strong> ${destinationUser.last_name}, ${destinationUser.real_name}</li>
                        </ul>
                        <p>Este es un correo automatizado. Por favor, no respondas a este mensaje. Si tienes alguna duda o necesitas asistencia adicional, contáctanos a nuestro servicio de atención al cliente al <strong style="color: #007BFF;">2235123456</strong> o visita nuestra página de soporte en <a href="http://localhost:4200/" style="color: #007BFF; text-decoration: underline;">nuestro sitio web.</a></p>
                            
                        </div>
                        <div class="footer">
                            <p>Gracias por confiar en nuestros servicios.</p>
                        </div>

                         <p><strong>AFRAM Group</strong></p>
                    </div>
                </body>
            </html>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado: " + info.response);
    return info;
  } catch (error) {
    throw new Error(`Error al enviar email: ${error.message}`);
  }
};

const sendEmailWithToken = async (to, recoveryToken) => {
  const emailText = `
        Este es un correo automatizado. No respondas a este correo. 
        Para recuperar la contraseña de tu cuenta de home banking, por favor utiliza el siguiente token de recuperación:

        ${recoveryToken}

        Si no solicitaste un cambio de contraseña, ignora este mensaje o contáctanos para más asistencia.
    `;

  const mailOptions = {
    from: '"AFRAM Group" <noreply@aframgroup.com>',
    to,
    subject: "Recuperación de Contraseña - Home Banking",
    text: emailText,
    html: `<html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f7f7f7;
                            color: #333;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #ffffff;
                            border-radius: 8px;
                            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            padding: 10px;
                        }
                        .header img {
                            width: 150px;
                            height: auto;
                        }
                        .content {
                            padding: 20px;
                            font-size: 16px;
                        }
                        .footer {
                            text-align: center;
                            font-size: 12px;
                            color: #777;
                            padding: 10px;
                        }
                        .footer a {
                            color: #007BFF;
                            text-decoration: none;
                        }
                        .token-container {
                            margin-top: 20px;
                            padding: 10px;
                            background-color: #f1f1f1;
                            border-radius: 5px;
                            text-align: center;
                            font-size: 16px;
                            font-weight: bold;
                            color: #333;
                        }
                    </style>
                </head>
                <body>
                <div class="container">
                        <div class="content">
                        <p>Estimado/a cliente,</p>

                        <p>Para recuperar la contraseña de tu cuenta de home banking, utiliza el siguiente token:</p>
                        <div class="token-container">
                            <p>${recoveryToken}</p>
                        </div>
                        
                        <p>Este es un correo automatizado. Por favor, no respondas a este mensaje. Si tienes alguna duda o necesitas asistencia adicional, contáctanos a nuestro servicio de atención al cliente al <strong style="color: #007BFF;">2235123456</strong> o visita nuestra página de soporte en <a href="http://localhost:4200/" style="color: #007BFF; text-decoration: underline;">nuestro sitio web.</a></p>
                        </div>
                        <div class="footer">
                            <p>Gracias por confiar en nuestros servicios.</p>
                        </div>

                        <p><strong>AFRAM Group</strong></p>
                    </div>
                </body>
            </html>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado: " + info.response);
    return info;
  } catch (error) {
    throw new Error(`Error al enviar email: ${error.message}`);
  }
};


export default { sendEmailService, sendTransferEmailService, sendEmailWithToken };
