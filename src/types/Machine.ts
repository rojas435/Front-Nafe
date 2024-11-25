export interface Machine {
    idMachine: number;
    id?: number; // Será opcional porque lo genera el backend
    name: string;
    description: string;
}
