import { Router } from 'express';
import GadgetController from '../controllers/gadget.controller';

const router = Router();
const gadgetController = new GadgetController();

// Bind methods to preserve 'this' context
const boundController = {
    getAllGadgets: gadgetController.getAllGadgets.bind(gadgetController),
    addGadget: gadgetController.addGadget.bind(gadgetController),
    updateGadget: gadgetController.updateGadget.bind(gadgetController),
    decommissionGadget: gadgetController.decommissionGadget.bind(gadgetController),
    selfDestructGadget: gadgetController.selfDestructGadget.bind(gadgetController),
    getConfirmationCode: gadgetController.getConfirmationCode.bind(gadgetController),
};

// Routes for gadget API
router.get('/gadgets', boundController.getAllGadgets);
router.post('/gadgets', boundController.addGadget);
router.patch('/gadgets/:id', boundController.updateGadget);
router.delete('/gadgets/:id', boundController.decommissionGadget);
router.post('/gadgets/:id/self-destruct', boundController.selfDestructGadget);
router.get('/gadgets/:id/confirmation-code', boundController.getConfirmationCode);

export default router;