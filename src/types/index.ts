export interface Gadget {
    id: string; // UUID
    name: string;
    status: 'Available' | 'Deployed' | 'Destroyed' | 'Decommissioned';
}

export interface GadgetResponse {
    id: string;
    name: string;
    status: 'Available' | 'Deployed' | 'Destroyed' | 'Decommissioned';
    missionSuccessProbability: number; // Randomly generated percentage
}

export interface CreateGadgetRequest {
    name: string;
}

export interface UpdateGadgetRequest {
    name?: string;
    status?: 'Available' | 'Deployed' | 'Destroyed' | 'Decommissioned';
}

