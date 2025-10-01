import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../types/auth";

// dummy user data for bulding frontend
const userData = {
    id: 1,
    name: "Robiul Islam Sagor",
    email: "sagor@gmail.com"
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(userData)

    const login = (userData: User) => setUser(userData)
    const logout = () => setUser(null)

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}