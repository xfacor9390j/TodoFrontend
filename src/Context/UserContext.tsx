import  { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the shape of the user data
interface User {
  _id: string;
  userName: string;
  email: string;
  authtype: string;
  githubId: string;
  __v: number;
}

// Define the context value shape
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUserDetails: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);  // Loading state
  const [error, setError] = useState<string | null>(null);    // Error state

  // Fetch user details from the backend
  const fetchUserDetails = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://todo-backend-theta-one.vercel.app/api/auth/user', {
        credentials: 'include',
      });

      if (response.ok) {
        const userData: User = await response.json();
        setUser(userData);
      } else {
        setUser(null);
        const errorMsg = await response.text();
        setError(`Failed to fetch user details: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUser(null);
      setError('An error occurred while fetching user details.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserDetails, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};
