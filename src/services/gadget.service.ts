export class GadgetService {
    private gadgets: any[] = []; // This will hold the gadgets in memory for now

    public getAllGadgets() {
        return this.gadgets.map(gadget => ({
            ...gadget,
            missionSuccessProbability: Math.floor(Math.random() * 100) // Random success probability
        }));
    }

    public addGadget(gadget: any) {
        const newGadget = {
            ...gadget,
            id: this.generateUUID(),
            status: 'Available'
        };
        this.gadgets.push(newGadget);
        return newGadget;
    }

    public updateGadget(id: string, updatedInfo: any) {
        const index = this.gadgets.findIndex(gadget => gadget.id === id);
        if (index !== -1) {
            this.gadgets[index] = { ...this.gadgets[index], ...updatedInfo };
            return this.gadgets[index];
        }
        throw new Error('Gadget not found');
    }

    public decommissionGadget(id: string) {
        const index = this.gadgets.findIndex(gadget => gadget.id === id);
        if (index !== -1) {
            this.gadgets[index].status = 'Decommissioned';
            this.gadgets[index].decommissionedAt = new Date();
            return this.gadgets[index];
        }
        throw new Error('Gadget not found');
    }

    private generateUUID() {
        // Simple UUID generation (for demonstration purposes)
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}