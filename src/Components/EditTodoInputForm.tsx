import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import  {useTodoContext} from '../Context/TodoContext';
export interface Todo {
    _id: string;
    title: string;
    description: string;
    status: boolean;
    userId: string;
    deadline: string;
    __v: number;
  }

interface EditTodoInputFormProps {
  todo: Todo;
  onSubmitSuccess: (updatedTodo: Todo) => void;
  handleClose: () => void;
}

const EditTodoInputForm: React.FC<EditTodoInputFormProps> = ({ todo, onSubmitSuccess, handleClose }) => {
  const [formState, setFormState] = useState({
    title: todo?.title || "",
      description: todo?.description || "",
    userId: todo?.userId || "",
  });
  const {fetchTodos}=useTodoContext();

  // Populate the form when the `todo` data is available
  useEffect(() => {
    if (todo) {
      setFormState({
        title: todo.title,
          description: todo.description,
        userId: todo.userId,
      });
    }
  }, [todo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      // Send a PUT request to update the todo
      
      const response = await fetch(`http://localhost:3000/api/todos/${todo._id}`, {
        credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    });

      const result = await response.json();
      

    if (response.ok) {
      onSubmitSuccess(result); // Callback to update the UI
        handleClose(); // Close the modal after successful submission
        fetchTodos()
    } else {
      console.error("Error updating todo:", result);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto",
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Title"
        name="title"
        value={formState.title}
        onChange={handleChange}
        required
        inputProps={{ maxLength: 10, minLength: 5 }}
      />

      <TextField
        label="Description"
        name="description"
        value={formState.description}
        onChange={handleChange}
        required
        multiline
        rows={4}
        inputProps={{ maxLength: 32, minLength: 7 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>

      <Button
        type="button"
        variant="outlined"
        color="secondary"
        onClick={() => setFormState({ title: '', description: '', userId: '' })}
      >
        Reset
      </Button>
      <div>Press ESC to close the modal</div>
    </Box>
  );
};

export default EditTodoInputForm;
