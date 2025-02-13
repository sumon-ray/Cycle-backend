import express from 'express';
import { cycle } from './cycle-controler';
import adminTokenVerify from '../auth/adminverifytoken';

const router = express.Router();

// all operation router select here for cycle model
router.post('/', adminTokenVerify, cycle.createCycle); // create cycle
router.get('/', cycle.getAllProduct); // get all cycles
router.get('/allProduct', cycle.getAllProductControler); // get all cycles
router.get('/:productId', cycle.getCycleById); // get specfic id cycle
router.put('/:productId', adminTokenVerify, cycle.updateCyclebyId); // update cycle
router.delete('/:productId', adminTokenVerify, cycle.deleteCycleById); // delete cycle
export const cycleRouter = {
  router,
};
