/// <reference lib="dom" />

import { Machine } from '../types/Machine';

export class MachineService {
    private baseUrl = 'http://localhost:8080/api/machines';

    // Helper method for handling HTTP requests
    /* eslint-disable no-undef */
    private async request<T>(url: string, options: RequestInit): Promise<T> {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
        };

        try {
            const response = await fetch(url, { ...options, headers, credentials: 'include' });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Response details:', {
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries(response.headers),
                    body: errorText
                });
                throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorText}`);
            }

            return response.json();
        } catch (error) {
            console.error('Request error:', error);
            throw error;
        }
    }

    // Fetch all machines
    async getMachines(): Promise<Machine[]> {
        return this.request<Machine[]>(this.baseUrl, { method: 'GET' });
    }

    // Fetch a machine by ID
    async getMachineById(id: number): Promise<Machine> {
        return this.request<Machine>(`${this.baseUrl}/${id}`, { method: 'GET' });
    }

    // Create a new machine
    async createMachine(machine: Omit<Machine, 'id'>): Promise<Machine> {
        return this.request<Machine>(this.baseUrl, {
            method: 'POST',
            body: JSON.stringify(machine),
        });
    }

    // Update an existing machine
    async updateMachine(id: number, updatedMachine: Omit<Machine, 'id'>): Promise<Machine> {
        return this.request<Machine>(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedMachine),
        });
    }

    // Delete a machine by ID
    async deleteMachine(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response details:', {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers),
                body: errorText,
            });
            throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorText}`);
        }

        // Handle empty response
        if (response.status === 204) {
            return; // No content to process
        }
    }
}

export default MachineService;
