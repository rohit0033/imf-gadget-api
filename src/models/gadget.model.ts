import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database';

export interface Gadget {
    id: string;
    name: string;
    status: 'Available' | 'Deployed' | 'Destroyed' | 'Decommissioned';
    missionSuccessProbability?: number;
    decommissionedAt?: Date;
    codename: string;
}
type UpdateableGadgetFields = Pick<Gadget, 'name' | 'status'>;
type GadgetKey = keyof UpdateableGadgetFields;

export class GadgetModel {
    private static generateMissionSuccessProbability(): number {
        return Math.floor(Math.random() * 100);
    }

    private static generateCodename(): string {
        const prefixes = ['The', 'Project', 'Operation'];
        const nouns = ['Nightingale', 'Kraken', 'Phoenix', 'Shadow', 'Tiger'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        return `${prefix} ${noun}`;
    }

    async createGadget(name: string): Promise<Gadget> {
        const query = `
            INSERT INTO gadgets (id, name, status, codename)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [uuidv4(), name, 'Available', GadgetModel.generateCodename()];
        
        const result = await pool.query(query, values);
        return {
            ...result.rows[0],
            missionSuccessProbability: GadgetModel.generateMissionSuccessProbability()
        };
    }

    async getAllGadgets(status?: string): Promise<Gadget[]> {
        let query = 'SELECT * FROM gadgets';
        const values: string[] = [];

        if (status) {
            query += ' WHERE status = $1';
            values.push(status);
        }

        const result = await pool.query(query, values);
        return result.rows.map(gadget => ({
            ...gadget,
            missionSuccessProbability: GadgetModel.generateMissionSuccessProbability()
        }));
    }

    async updateGadget(id: string, updates: Partial<UpdateableGadgetFields>): Promise<Gadget | null> {
        const validFields: GadgetKey[] = ['name', 'status'];
        const updateFields = Object.keys(updates).filter((key): key is GadgetKey => 
            validFields.includes(key as GadgetKey)
        );
        
        if (updateFields.length === 0) return null;
    
        const setClause = updateFields
            .map((field, index) => `${field} = $${index + 2}`)
            .join(', ');
        
        const query = `
            UPDATE gadgets 
            SET ${setClause}
            WHERE id = $1
            RETURNING *
        `;
    
        const values = [id, ...updateFields.map(field => updates[field])];
        const result = await pool.query(query, values);
        
        return result.rows[0] ? {
            ...result.rows[0],
            missionSuccessProbability: GadgetModel.generateMissionSuccessProbability()
        } : null;
    }

    async decommissionGadget(id: string): Promise<Gadget | null> {
        const query = `
            UPDATE gadgets 
            SET status = 'Decommissioned', decommissioned_at = NOW()
            WHERE id = $1
            RETURNING *
        `;
        
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }

    async selfDestructGadget(id: string): Promise<Gadget | null> {
        const query = `
            UPDATE gadgets 
            SET status = 'Destroyed'
            WHERE id = $1
            RETURNING *
        `;
        
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }

    async getGadgetById(id: string): Promise<Gadget | null> {
        const query = 'SELECT * FROM gadgets WHERE id = $1';
        const result = await pool.query(query, [id]);
        
        return result.rows[0] ? {
            ...result.rows[0],
            missionSuccessProbability: GadgetModel.generateMissionSuccessProbability()
        } : null;
    }
}