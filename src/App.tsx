import "./App.css";
import CreateButton from "./Components/CreateButton";
import GridContainer from "./Components/GridContainer";
import NavBar from "./Components/NavBar";
import { AuthProvider } from "./Context/AuthContext";
import { UserProvider } from "./Context/UserContext";
import { TodoProvider } from "./Context/TodoContext";
import { FormProvider } from "./Context/FormContext";

function App() {
  return (
    <>
      <NavBar />
      <CreateButton />
      <GridContainer />
     
    </>
  );
}

function AppWrapper() {
  return (
    <AuthProvider>
      <UserProvider>
        <TodoProvider>
          <FormProvider>
            <App />
          </FormProvider>
        </TodoProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default AppWrapper;