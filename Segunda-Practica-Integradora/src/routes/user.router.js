import { Router } from 'express';
import userService from '../services/user.service.js';
import { encriptPass, comparePass } from '../tools/encrypt.js';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
	const userData = { 
		...req.body, 
		password: encriptPass(req.body.password),
		cart: [],
	};
	try {
		
		const newUser = await userService.createUser(userData);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

const admin = {
	email: 'adminCoder@coder.com',
	password: 'adminCod3r123'
}



usersRouter.post('/:userId/cart', async (req, res) => {
	const userId = req.params.userId;
	const productId = req.body.productId;

	console.log(userId);
	res.render('user', { userId });

  
	try {
	  // Buscar al usuario por su ID
	  const user = await User.findById(userId);
  
	  if (!user) {
		return res.status(404).json({ message: 'Usuario no encontrado' });
	  }
  
	  // Añadir el producto al carrito del usuario
	  user.cart.push(productId);
  
	  // Guardar los cambios en la base de datos
	  await user.save();
  
	  return res.status(200).json({ message: 'Producto añadido al carrito correctamente' });
	} catch (error) {
	  console.error('Error al añadir producto al carrito:', error);
	  return res.status(500).json({ message: 'Error interno del servidor' });
	}
  });
  



usersRouter.post('/auth', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userService.getByEmail(email);

		if (email !== admin.email || password !== admin.password) {
		
			if (!user) throw new Error('Invalid data'); // Comprobo si existe el usuario
			if (!comparePass(user, password)) throw new Error('Invalid data'); // Comprobo si la contraseña coincide
	
			// Guardo la session
			req.session.user = user;

			res.redirect('/');


		} else {
			const user = admin.email
			// Guardo la session
			req.session.user = user;
			
			res.redirect('/');
		}


	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

usersRouter.post('/logout', (req, res) => {
	req.session.destroy();

	res.redirect('/login');
});

export default usersRouter;
