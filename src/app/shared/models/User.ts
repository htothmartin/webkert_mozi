export interface User {
    id: string;
    email: string;
    birtday: Date;
    name: {
        firstname: string;
        lastname: string;
    }
}