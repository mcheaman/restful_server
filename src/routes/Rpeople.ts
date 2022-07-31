import express, {Router} from 'express';
import controller from '../controllers/Cpeople';

const router = express.Router();

router.post('/people', controller.createPerson);
router.get('/people', controller.getPeople);

export default router;