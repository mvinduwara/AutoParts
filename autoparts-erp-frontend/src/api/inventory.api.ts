import { api } from './axiosInstance';

// This is the export your App.tsx is looking for!
export interface Part {
    id: number;
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