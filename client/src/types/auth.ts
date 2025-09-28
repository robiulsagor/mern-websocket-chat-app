export interface User {
    id: string | number;
    name: string;
    email: string;
}

export interface AuthContextType {
    user: User | null
    login: (userData: User) => void
    logout: () => void
}