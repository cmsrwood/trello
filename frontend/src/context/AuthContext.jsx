import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    // Estado que guarda el rol del usuario
    const [role, setRole] = useState('guest'); // Valor por defecto 'guest'

    return (
        <AuthContext.Provider value={{ role, setRole }}>
            {children}
        </AuthContext.Provider>
    );
};
