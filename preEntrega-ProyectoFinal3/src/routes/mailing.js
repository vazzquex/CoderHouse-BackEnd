import { Router } from 'express';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

import 'dotenv/config'

//twilio info
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_NUM = process.env.TWILIO_NUM

const email = process.env.EMAIL
const email_pass = process.env.EMAIL_PASS

const mailingRoutes = Router();


mailingRoutes.post("/mail", async (req, res) => {
    const { userEmail, products, total } = req.body;

    let productListHTML = '';

    // Generar el HTML para cada producto y agregarlo a la lista de productos.
    for (const product of products) {
        const title = product.productId.title;
        const quantity = product.quantity;
        const description = product.description
        const price = product.productId.price;
        const subtotal = product.subtotal;

        productListHTML += `
            <div class="row mb-3">
                <div class="col-md-6">
                    <h5>${title}</h5>
                    <p>${description}</p>
                </div>
                <div class="col-md-2 text-end">
                    <p>Cantidad: ${quantity}</p>
                </div>
                <div class="col-md-2 text-end">
                    <p>Precio: $${price}</p>
                </div>
                <div class="col-md-2 text-end">
                    <p>Subtotal: $${subtotal}</p>
                </div>
            </div>
        `;
    }

    // Generar el HTML completo del correo electrónico.
    const emailHTML = `
        <h1>Thanks for your purchase!</h1>
        <hr>
        <section id="order-confirmation" class="container mt-5">
            <h1 class="text-center">Purchase Detail</h1>
            <hr>
            <div id="order-details">
                ${productListHTML}
                <hr>
                <div class="row">
                    <div class="col-md-9">
                        <h4>Total:</h4>
                    </div>
                    <div class="col-md-3 text-end">
                        <h4>$${total} USD</h4>
                    </div>
                </div>
            </div>
        </section>
    `;


    let mailOptions = await trasport.sendMail({
        from: `Coder Test <${email}>`,
        to: userEmail,
        subject: 'Shopping Coder',
        html: emailHTML, // Aquí agregamos el HTML completo del correo electrónico.

        //attachments: []
    });

    trasport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('No se puedo enviar el correo electrónico' + error);
        }
        console.log('Correo electrónico enviado: ' + info.response);
    });

    res.status(201).send('The details of the purchase have been sent to: ', userEmail);
});


const trasport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: `${email}`,
        pass: `${email_pass}`

    }
});

export default mailingRoutes;