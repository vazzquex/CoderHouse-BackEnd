import { Router } from "express";

const documentationRouter = Router();

documentationRouter.get('/', (req, res) => {
    const { user } = req.session;
    try {
        
        res.status(200).render('documentation', {
            title: 'Documentation',
            user,
        })

    }catch(err) {
        req.logger.error(err);
        res.send(500).json({ error: 'server error', err});
    }
    
})

export default documentationRouter