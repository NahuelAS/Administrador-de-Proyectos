import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send('desde API');
});

export default router;