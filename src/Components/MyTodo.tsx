import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Modal,
  Box
} from "@mui/material";
// import UserInputForm from "./UserInputForm";
import EditTodoInputForm from "./EditTodoInputForm";
import {useTodoContext} from '../Context/TodoContext'

export interface Todo {
  _id: string;
  title: string;
  description: string;
  status: boolean;
  userId: string;
  deadline: string;
  __v: number;
}
const MyTodoCard = styled(Card)(({ theme }) => ({
  backgroundColor: "orange",
  ...theme.typography.body2,
  padding: theme.spacing(),
  textAlign: "center",
  color: "white",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
};

export default function MyTodo({ todo }: { todo: Todo }) {
  const {fetchTodos}=useTodoContext()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTodoUpdate = (updatedTodo: Todo) => {
    console.log("Updated Todo:", updatedTodo);
    handleClose(); 
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/todos/${todo._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete todo: ${errorText}`);
      }

      console.log('Todo deleted successfully');
      fetchTodos();
      // handleConfirmDeleteClose();
      // You may need to update the parent component or context to reflect the deletion
      // For example, you might want to call a function to refetch todos
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting todo:', error.message);
      } else {
        console.error('Unknown error occurred:', error);
      }
    }
  }
  return (
    <>
      <MyTodoCard sx={{ maxHeight: 250 }}>
        <CardContent>
          <Typography variant="h5">{todo.title}</Typography>
          <Typography gutterBottom variant="body1">
            {"Tomorrow!"}
          </Typography>
          <Typography gutterBottom variant="h5">
            Description
          </Typography>
          <Typography gutterBottom variant="body2">
            {todo.description}
          </Typography>
        </CardContent>
        <CardActions sx={{display:'flex', justifyContent:'center'}}>
          <Button variant="contained" onClick={handleOpen}>
            Edit
          </Button>
          <Button variant="contained" onClick={handleDelete}>Delete</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* <UserInputForm  /> */}
              <EditTodoInputForm todo={todo}  onSubmitSuccess={handleTodoUpdate} handleClose={handleClose}/>
            </Box>
          </Modal>
        </CardActions>
      </MyTodoCard>
    </>
  );
}
