import { Request, Response } from 'express';
import { GadgetModel, Gadget } from '../models/gadget.model';

class GadgetController {
    private gadgetModel: GadgetModel;
    private confirmationCodes: Map<string, string>;

    constructor() {
        this.gadgetModel = new GadgetModel();
        this.confirmationCodes = new Map();
    }

    async getAllGadgets(req: Request, res: Response) {
        try {
            const status = req.query.status as string | undefined;
            const gadgets = await this.gadgetModel.getAllGadgets(status);
            res.json({ success: true, data: gadgets });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to fetch gadgets' });
        }
    }

    async addGadget(req: Request, res: Response) {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ success: false, error: 'Name is required' });
            }

            const gadget = await this.gadgetModel.createGadget(name);
            res.status(201).json({ success: true, data: gadget });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to create gadget' });
        }
    }

    async updateGadget(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const gadget = await this.gadgetModel.updateGadget(id, updates);
            if (!gadget) {
                return res.status(404).json({ success: false, error: 'Gadget not found' });
            }

            res.json({ success: true, data: gadget });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to update gadget' });
        }
    }

    async decommissionGadget(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const gadget = await this.gadgetModel.decommissionGadget(id);
            
            if (!gadget) {
                return res.status(404).json({ success: false, error: 'Gadget not found' });
            }

            res.json({ success: true, data: gadget });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to decommission gadget' });
        }
    }
    async getConfirmationCode(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const gadget = await this.gadgetModel.getGadgetById(id);
            
            if (!gadget) {
                return res.status(404).json({ success: false, error: 'Gadget not found' });
            }

            const confirmationCode = Math.random().toString(36).substring(7);
            this.confirmationCodes.set(id, confirmationCode);

            // Code expires in 5 minutes
            setTimeout(() => this.confirmationCodes.delete(id), 5 * 60 * 1000);

            res.json({ 
                success: true, 
                data: { confirmationCode } 
            });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to generate confirmation code' });
        }
    }

    async selfDestructGadget(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { confirmationCode } = req.body;

            // Generate a random confirmation code for demonstration
            const expectedCode = this.confirmationCodes.get(id);
            
            if (confirmationCode !== expectedCode) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Invalid or expired confirmation code',
                   
                });
            }

            const gadget = await this.gadgetModel.selfDestructGadget(id);
            if (!gadget) {
                return res.status(404).json({ success: false, error: 'Gadget not found' });
            }

            res.json({ success: true, data: gadget });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to self-destruct gadget' });
        }
    }
    async getGadgetsById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const gadget = await this.gadgetModel.getGadgetById(id);
            
            if (!gadget) {
                return res.status(404).json({ success: false, error: 'Gadget not found' });
            }

            res.json({ success: true, data: gadget });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to fetch gadget' });
        }
    }
       
}

export default GadgetController;