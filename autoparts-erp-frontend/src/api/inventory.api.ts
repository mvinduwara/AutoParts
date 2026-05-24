import { api } from './axiosInstance';

export interface Part {
    id?: number; 
    sku: string;
    name: string;
    brand: string;
    category: string;
    costPrice: number;
    sellingPrice: number;
}

export const getParts = async (): Promise<Part[]> => {
    const response = await api.get('/inventory/parts');
    return response.data;
};

export const createPart = async (partData: Part): Promise<Part> => {
    const response = await api.post('/inventory/parts', partData);
    return response.data;
};