import { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  userId: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

interface JWTPayload {
  user: {
    id: string;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function decodeJWT(token: string): JWTPayload {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return { user: { id: "" } };
  }
}

function extractUserId(token: string | null): string | null {
  if (!token) return null;
  
  const payload = decodeJWT(token);
  return payload.user?.id || null;  // Extract ID from the nested user object
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      const extractedUserId = extractUserId(token);
      setUserId(extractedUserId);
    } else {
      setUserId(null);
    }
  }, [token]);

  const handleSetToken = (newToken: string) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, setToken: handleSetToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
