import React, { createContext, useState, useContext } from "react";
import { useTodoContext } from "../Context/TodoContext";
import { useUserContext } from "../Context/UserContext";
// import { useAuth } from './AuthContext';
// Define the shape of the form state
interface FormState {
  title: string;
  description: string;
  userId: string; // Added userId field as required
}

// Define the context value shape
interface FormContextType {
  formState: FormState;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

interface FormProviderProps {
  children: React.ReactNode;
}

// Create a provider component
export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const { todos, fetchTodos } = useTodoContext();
  const { user } = useUserContext();
  

  // Initialize the form state, pre-filling userId (assumed to be available)
  const [formState, setFormState] = useState<FormState>({
    title: "",
    description: "",
    userId: user?.githubId || "", // Set the default userId here (can be dynamic)
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   
      try {
        formState.userId = user?.githubId ?? "";
        const response = await fetch("https://todo-backend-theta-one.vercel.app/api/todos", {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });

        if (!response.ok) {
          const errorText = await response.text(); // Get the response text
          throw new Error(`Failed to create a todo: ${errorText}`);
        }

        const data = await response.json();

        fetchTodos();
        console.log("Todo created successfully:", data);

        // Reset the form state after successful submission
        setFormState({
          title: "",
          description: "", // Reset but keep the userId
          userId: user?.githubId || "",
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error creating todo:", error.message);
        } else {
          console.error("Unknown error occurred:", error);
        }
      }
    
  };

  const handleReset = () => {
    setFormState({
      title: "",
      description: "",
      userId: todos[0]?.userId, // Reset but keep the userId
    });
  };

  return (
    <FormContext.Provider
      value={{ formState, handleChange, handleSubmit, handleReset }}
    >
      {children}
    </FormContext.Provider>
  );
};
