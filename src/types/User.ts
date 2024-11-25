import { Role } from "./Role";

export type User ={
    id: number;
    name: string;
    email: string;
    phone: string;
    rh: string;
    weight: number;
    roles?: Role[];
    roleId ?: number;
}
