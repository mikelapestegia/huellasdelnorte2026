"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos de usuario
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'user' | 'admin';
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Simular carga de sesión al inicio
    useEffect(() => {
        const storedUser = localStorage.getItem('user_session');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        // En una app real, aquí se llamaría a la API.
        // Hacemos un mock con un delay para simular red.
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                if (password.length < 6) {
                    reject(new Error("La contraseña es demasiado corta"));
                    return;
                }
                // Mock user data
                const mockUser: User = {
                    id: 'usr_123',
                    name: email.split('@')[0], // Nombre basado en email
                    email: email,
                    avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
                    role: 'user'
                };
                setUser(mockUser);
                localStorage.setItem('user_session', JSON.stringify(mockUser));
                resolve();
            }, 1000); // 1s delay
        });
    };

    const signUp = async (name: string, email: string, password: string) => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                // Mock register
                const mockUser: User = {
                    id: 'usr_new_123',
                    name: name,
                    email: email,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
                    role: 'user'
                };
                setUser(mockUser);
                localStorage.setItem('user_session', JSON.stringify(mockUser));
                resolve();
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user_session');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
