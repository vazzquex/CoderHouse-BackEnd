import { Router } from "express";
import { userRepository } from "../repositories/index.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";

const emailOwn = process.env.EMAIL
const email_pass = process.env.EMAIL_PASS

const restoreRouter = Router();

restoreRouter.get('/', (req, res) => {
    req.logger.info('Cargando página de restauración');
    res.render('restore', {
        title: 'Restore',
    });
});

restoreRouter.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        req.logger.info(`Solicitud de restablecimiento de contraseña para ${email}`);
        const user = await userRepository.getByEmail(email); // Modificación aquí
        if (!user) {
            req.logger.warning(`Usuario no encontrado: ${email}`);
            return res.status(400).send('Usuario no encontrado');
        }

        // Generar token
        const token = crypto.randomBytes(20).toString('hex');
        const expires = Date.now() + 3600000;

        user.resetPasswordToken = token;
        user.resetPasswordExpires = expires;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: emailOwn,
                pass: email_pass
            }
        });

        const mailOptions = {
            to: email,
            from: emailOwn,
            subject: 'Restablecimiento de contraseña',
            text: `Por favor, haz clic en el siguiente enlace para completar el proceso:\n\nhttp://${req.headers.host}/restore/reset-password/${token}\n\nSi no solicitaste esto, por favor ignora este mensaje.`
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                req.logger.error(`Error al enviar correo: ${err.message}`);
                return res.status(500).send(err.message);
            }
            req.logger.info('Correo enviado exitosamente');
            res.send('Correo enviado exitosamente');
        });
    } catch (error) {
        req.logger.error(`Error en la solicitud de restablecimiento de contraseña: ${error.message}`);
        res.status(500).send(error.message);
    }
});

restoreRouter.get('/reset-password/:token', (req, res) => {
    req.logger.info('Cargando página de restablecimiento de contraseña');
    res.render('reset-password', { token: req.params.token });
});

restoreRouter.post('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        req.logger.info(`Solicitud para cambiar la contraseña con el token: ${token}`);
        const user = await userRepository.findTokenAndExpiraton(token);
        if (!user) {
            req.logger.warning('Token inválido o expirado');
            return res.status(400).send('Token inválido o expirado');
        }

        user.password = bcrypt.hashSync(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        req.logger.info('Contraseña actualizada exitosamente');
        res.send('Contraseña actualizada exitosamente');
    } catch (error) {
        req.logger.error(`Error al actualizar la contraseña: ${error.message}`);
        res.status(500).send(error.message);
    }
});

export default restoreRouter;
