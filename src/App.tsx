import "./App.css";
import CreateButton from "./Components/CreateButton";
import GridContainer from "./Components/GridContainer";
import NavBar from "./Components/NavBar";
import { AuthProvider } from "./Context/AuthContext";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";
import { TodoProvider } from "./Context/TodoContext";
import { FormProvider } from "./Context/FormContext";
import PracticeMui from "./Components/PracticeMui";
function App() {
  
  return (
    <>
      <NavBar />
      <CreateButton />
      <GridContainer />
      <PracticeMui/>
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