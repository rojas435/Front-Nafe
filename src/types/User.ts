import { Role } from "./Role";

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    rh: string;
    weight: number;
    roles: Role[];
}
