import { Router } from 'express';
import passport from 'passport';
import { filterCurrent } from '../middleware/current.middleware.js';
import sessionController from '../controllers/session.controller.js'

const sessionsRouter = Router();

sessionsRouter.get('/current', filterCurrent, sessionController.getCurrentUser);

sessionsRouter.get(
	'/github',
	passport.authenticate('github', { scope: ['user:email'] }),
	async (req, res) => {
		req.logger.info('Starting GitHub authentication');
	}
);

sessionsRouter.get(
	'/githubcallback',
	passport.authenticate('github', { failureRedirect: '/login' }),
	(req, res) => {
		if (req.user) {
			req.logger.info('GitHub authentication successful');
			req.session.user = req.user;
		} else {
			req.logger.warning('GitHub authentication failed');
		}
		res.redirect('/');
	}
);

export default sessionsRouter;
