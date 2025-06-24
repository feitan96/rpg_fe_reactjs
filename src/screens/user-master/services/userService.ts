import axios from 'axios';
import type { User } from '../types/User';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
    throw new Error('VITE_API_BASE_URL environment variable is not set');
}

const API_URL = `${BASE_URL}/api/users`;

export const userService = {
    createUser: async (user: User) => {
        const response = await axios.post(API_URL, user);
        return response.data;
    },

    getAllUsers: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },
    
    getAllActiveUsers: async () => {
        const response = await axios.get(`${API_URL}/active`);
        return response.data;
    },
    
    getUserById: async (id: string) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    updateUser: async (id: string, user: User) => {
        const response = await axios.put(`${API_URL}/${id}`, user);
        return response.data;
    },

    softDeleteUser: async (id: string) => {
        const response = await axios.put(`${API_URL}/${id}/soft`);
        return response.data;
    },

    hardDeleteUser: async (id: string) => {
        const response = await axios.delete(`${API_URL}/${id}/hard`);
        return response.data;
    }
};
