import { Router } from "express";

const restoreRouter = Router();

restoreRouter.get('/', (req, res) => {

    res.render('restore', {
        title: 'Restore',
    });

})

export default restoreRouter;