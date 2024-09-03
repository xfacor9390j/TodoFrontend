import Grid from '@mui/material/Grid';
import MyTodo from './MyTodo';
import { useTodoContext } from '../Context/TodoContext';
import { useUserContext } from '../Context/UserContext';
export default function GridContainer() {
  const { user } = useUserContext()
  console.log('from grid', user?.githubId)
  const { todos } = useTodoContext()
  return (
   <Grid container spacing={4} sx={{ padding: 3 }}>
   {todos.map((todo) => (
     <Grid item xs={12} sm={6} md={4} key={todo._id}>
       <MyTodo todo={todo} />
     </Grid>
   ))}
 </Grid>
  );
}
