import  { createContext, useContext, useState, useEffect } from "react";
import { useUserContext } from "./UserContext";
// Define the Todo type
export interface Todo {
  _id: string;
  title: string;
  description: string;
  status: boolean;
  userId: string;
  deadline: string;
  __v: number;
}

// Define the context type
interface TodoContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  fetchTodos: () => void; // Method to fetch todos
}

// Create the context with a default value
const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: React.ReactNode;
}

// Create the provider component
export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { user } = useUserContext();

  const fetchTodos = async () => {
    try {
      console.log("from fetchTodos", user?.githubId);
      const response = await fetch(`https://todo-backend-theta-one.vercel.app/api/todos/${user?.githubId}`,
      
        {
          credentials: "include",
          method:'GET',
         },
        
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Todo[] = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    if (user) {
      console.log(`http://localhost:3000/api/todos/${user?.githubId}`)
      fetchTodos();
    }
  }, [user]);

  return (
    <TodoContext.Provider value={{ todos, setTodos, fetchTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to use the Todo context
export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
