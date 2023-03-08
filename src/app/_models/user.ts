export class User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    registration: Date;
    lastLogin: Date;
    roles: string[];
    telephone: number;
    email: string;
    confirmEmail: boolean;
    active: boolean;
    token: string;
  isDeleting: boolean;
}
