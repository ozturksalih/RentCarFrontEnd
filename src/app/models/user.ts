export interface User {
    email: string;
    firstName: string;
    id: number;

    lastName: string;

    passwordHash: string;
    passwordSalt: string;
    status: boolean;
}