import { Box, Button, TextField } from "@mui/material";
import { useFormContext } from "../Context/FormContext";
import { useUserContext } from "../Context/UserContext";

export default function UserInputForm() {
  const { formState, handleChange, handleSubmit, handleReset } =
    useFormContext();
 
  const { user } = useUserContext()
  console.log("from userInput",user?.githubId)
  
  return (
    <>
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

        
        {/* <TextField
          label="User ID"
          name="userId"
          value={formState.userId}
          defaultValue={user?.githubId}
          onChange={handleChange}  
          required
          InputProps={{
            readOnly: true, 
          }}
        /> */}

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>

        <Button
          type="button"
          variant="outlined"
          color="secondary"
          onClick={handleReset}
        >
          Reset
        </Button>
        <div>press esc for closing the modal</div>
      </Box>
    </>
  );
}
