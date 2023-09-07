import { userService } from "../services/index.js";
import { encriptPass, comparePass } from "../tools/encrypt.js";
import config from '../tools/config.js';

const admin = {
	email: config.adminUser,
	password: config.adminPassword
}


const createUser = async (req, res) => {
    const userData = {
        ...req.body,
        password: encriptPass(req.body.password),
        cart: [],
    };
    try {
        req.logger.info('Creating new user');

        const newUser = await userService.createUser(userData);

        req.logger.info('User created successfully');

        res.status(201).json(newUser);
    } catch (error) {
        req.logger.error(`Error creating user: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
}

const authUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        req.logger.info('Authenticating user');

        const user = await userRepository.getByEmail(email);

        if (email !== admin.email || password !== admin.password) {

            if (!user) throw new Error('Invalid data'); // Comprobo si existe el usuario
            if (!comparePass(user, password)) throw new Error('Invalid data'); // Comprobo si la contraseña coincide

            req.logger.info('User authenticated successfully');

            // Guardo la session
            req.session.user = user;

            res.redirect('/');


        } else {

            req.logger.info('Admin authenticated successfully');

            const user = admin.email

            // Guardo la session
            req.session.user = user
            req.session.admin = true

            res.redirect('/');
        }


    } catch (error) {
        req.logger.error(`Authentication failed: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
}

const logOut = async (req, res) => {
    req.logger.info('User logged out');

    req.session.destroy();

    res.redirect('/login');
}

const updateRol = async (req, res) => {
    const uid = req.params.uid;
    req.logger.debug(`User ID ${uid}`)

    try {
        req.logger.info('Updating rol...');
        const user = await userService.getById(uid);

        if (user.rol == 'premium') {

            await userService.updateRolToUser(uid);
            req.logger.info('User update to user');

            // Actualiza el objeto de usuario en la sesión
            req.session.user.rol = 'user';

            // Guarda los cambios en la sesión
            req.session.save(err => {
                if (err) {
                    req.logger.error("Error in save session")
                } else {
                    res.redirect('/');
                }
            });

        }

        if (user.rol == 'user') {

            await userService.updateRolToPremium(uid);
            req.logger.info('User update to premium');

            // Actualiza el objeto de usuario en la sesión
            req.session.user.rol = 'premium';

            // Guarda los cambios en la sesión
            req.session.save(err => {
                if (err) {
                    req.logger.error("Error in save session")
                } else {
                    res.redirect('/');
                }
            });

        }

    } catch (error) {
        req.logger.panic('Error updating rol:', error);
        return res.status(500).send('Error updating user rol');
    }
};

export default {
    createUser,
    authUser,
    logOut,
    updateRol
}